/**
 * Deterministic scan for AI-tell patterns in a blog post draft.
 *
 *   node scripts/check-blog-prose.mjs <path-to-mdx-file>
 *
 * Detections (all from .claude/skills/ai-antipatterns/SKILL.md):
 *   1. Em dashes in prose (with description-list / link-list exceptions)
 *   2. "Without X, Y. Without Y, X." inversion structure
 *   3. Banned words (universal list)
 *   4. Throat-clearing phrases (exact and pattern matches)
 *   5. Triple-repetition (3 consecutive sentences starting with the same word)
 *   6. Long sentences with parallel construction (either/or, not only/but also, both/and over ~25 words)
 *   7. Quotation marks in prose (warning; double quotes only, per personal-tone)
 *
 * Output: human-readable findings to stdout. Exit code 0 if no findings,
 * 1 if any critical findings. Warnings (including quotation marks) never
 * change the exit code.
 *
 * This script is the deterministic gate in the blog-draft / blog-review
 * workflow. LLM judgment for harder patterns (aphoristic closings,
 * schematic-identical templates) runs separately as part of blog-checklist.
 */

import { readFile } from "node:fs/promises";

const [, , filePath] = process.argv;

if (!filePath) {
  console.error("Usage: node scripts/check-blog-prose.mjs <path-to-mdx-file>");
  process.exit(2);
}

const raw = await readFile(filePath, "utf8");

// --------------------------------------------------------------------------
// Preprocessing
// --------------------------------------------------------------------------

/** Strip frontmatter; return body only. */
function stripFrontmatter(src) {
  const m = src.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  return m ? m[1] : src;
}

/** Replace fenced code blocks with blank lines (preserve line numbers). */
function maskCodeBlocks(src) {
  return src.replace(/```[\s\S]*?```/g, (block) =>
    block
      .split("\n")
      .map(() => "")
      .join("\n")
  );
}

const body = maskCodeBlocks(stripFrontmatter(raw));
const lines = body.split(/\r?\n/);

const findings = [];

function add({ severity, rule, line, text, suggestion }) {
  findings.push({ severity, rule, line, text, suggestion });
}

// --------------------------------------------------------------------------
// Check 1: em dashes in prose
// --------------------------------------------------------------------------
// Allowed em-dash contexts (per ai-antipatterns):
//   - Description list: `**Bold** — value`
//   - Link list: `- [text](url) — description`
//   - Numbered description: `1. **Bold** — value`
//   - Empty table cell: `—` alone in a cell
// Everything else is a violation.

function isAllowedEmDashLine(line) {
  const trimmed = line.trim();

  // Description list with leading bullet: `- **X** — Y` or with bold prefix
  if (/^[-*]?\s*\*\*[^*]+\*\*\s*—\s+/.test(trimmed)) return true;

  // Link list: `- [text](url) — description`
  if (/^[-*]\s*\[[^\]]+\]\([^)]+\)\s*—\s+/.test(trimmed)) return true;

  // Numbered description: `1. **Bold** — value`
  if (/^\d+\.\s*\*\*[^*]+\*\*\s*—\s+/.test(trimmed)) return true;

  // Empty table cell row: a row of cells where every non-empty cell is `—`
  if (/^\|/.test(trimmed)) {
    const cells = trimmed.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.every((c) => c === "—")) return true;
    // Allow rows that include `—` as cell content alongside other content;
    // mixed-content table rows still violate if the em dash appears in prose.
  }

  // Horizontal rule of em dashes alone is allowed as a separator
  if (/^—{3,}$/.test(trimmed)) return true;

  return false;
}

lines.forEach((line, idx) => {
  if (!line.includes("—")) return;
  if (isAllowedEmDashLine(line)) return;
  add({
    severity: "critical",
    rule: "em-dash-in-prose",
    line: idx + 1,
    text: line.trim(),
    suggestion: "Replace with comma, period, colon, or parentheses.",
  });
});

// --------------------------------------------------------------------------
// Check 2: "Without X, Y. Without Y, X." inversions
// --------------------------------------------------------------------------
// Pattern: two consecutive sentences both starting with "Without " (or case-insensitive)
// within a small window.

const withoutInversionRegex =
  /(^|[.!?]\s+)(Without\s+[^.!?]{3,}[.!?]\s+Without\s+[^.!?]{3,}[.!?])/g;

let match;
while ((match = withoutInversionRegex.exec(body)) !== null) {
  // Compute line number of the match
  const upToMatch = body.slice(0, match.index + match[1].length);
  const lineNum = upToMatch.split("\n").length;
  add({
    severity: "critical",
    rule: "without-inversion",
    line: lineNum,
    text: match[2].trim().slice(0, 140) + (match[2].length > 140 ? "…" : ""),
    suggestion:
      "Classic AI rhetorical move. Rewrite one of the two sentences with a different structure.",
  });
}

// --------------------------------------------------------------------------
// Check 3: banned words (from ai-antipatterns universal list)
// --------------------------------------------------------------------------

const BANNED_WORDS = [
  "leverage",
  "utilize",
  "seamless",
  "robust",
  "comprehensive",
  "ecosystem",
  "synergy",
  "paradigm",
  "ideate",
  "streamline",
  "empower",
  "unlock",
  "harness",
  "optimize",
  "landscape",
  "cutting-edge",
  "best-in-class",
  "world-class",
  "next-generation",
  "holistic",
  "scalable",
  "innovative",
  "facilitate",
  "bolster",
  "whilst",
  "moreover",
  "furthermore",
  "thus",
  "hence",
  "thereof",
  "therein",
  "definitely",
  "certainly",
  "guarantees",
  "eliminates",
  "impossible",
];

// Build a single regex with word boundaries; case-insensitive.
const bannedWordRegex = new RegExp(
  `\\b(${BANNED_WORDS.join("|")})\\b`,
  "gi"
);

lines.forEach((line, idx) => {
  let m;
  while ((m = bannedWordRegex.exec(line)) !== null) {
    add({
      severity: "critical",
      rule: "banned-word",
      line: idx + 1,
      text: `"${m[0]}" in: ${line.trim().slice(0, 120)}${line.length > 120 ? "…" : ""}`,
      suggestion: "See ai-antipatterns banned-words table for replacement.",
    });
  }
});

// --------------------------------------------------------------------------
// Check 4: throat-clearing phrases
// --------------------------------------------------------------------------

const THROAT_CLEARING_PHRASES = [
  "it's important to note that",
  "it is important to note that",
  "it's worth mentioning that",
  "worth remembering that",
  "it should be noted that",
  "it bears mentioning that",
  "as previously mentioned",
  "as noted above",
  "as noted earlier",
  "as you may know",
  "as we all know",
  "needless to say",
  "interestingly,",
  "the thing is,",
  "the reality is,",
  "in conclusion,",
  "to summarize,",
  "to sum up,",
  "in summary,",
  "all in all,",
  "at the end of the day,",
  "the bottom line is",
  "to recap,",
  "with all of the above in mind",
  "excited to share",
  "thrilled to announce",
  "we're happy to report",
  "this is a game-changer",
  "this powerful feature",
  "let's take a look at",
  "let's dive into",
  "let's explore",
  "without further ado",
  "having said that,",
  "that being said,",
  "it goes without saying",
  "a common framing in",
  "there's been a lot of discussion about",
  "many people face the same problem",
];

const bodyLower = body.toLowerCase();
THROAT_CLEARING_PHRASES.forEach((phrase) => {
  let searchFrom = 0;
  while (true) {
    const idx = bodyLower.indexOf(phrase, searchFrom);
    if (idx === -1) break;
    const upTo = body.slice(0, idx);
    const lineNum = upTo.split("\n").length;
    const lineContent = body.split("\n")[lineNum - 1] ?? "";
    add({
      severity: "critical",
      rule: "throat-clearing",
      line: lineNum,
      text: `"${phrase}" in: ${lineContent.trim().slice(0, 120)}${lineContent.length > 120 ? "…" : ""}`,
      suggestion: "Cut the phrase and start with the actual point.",
    });
    searchFrom = idx + phrase.length;
  }
});

// --------------------------------------------------------------------------
// Check 5: triple-repetition (3 consecutive sentences starting with same word)
// --------------------------------------------------------------------------
// Split body into sentences (rough — splits on . ! ? followed by space + capital).
// For each run of 3+ consecutive sentences starting with the same word
// (case-insensitive), flag.

function splitSentences(src) {
  return src
    .split(/(?<=[.!?])\s+(?=[A-Z])/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function firstWord(sentence) {
  const m = sentence.match(/^[#*_\[\(]*([A-Za-z']+)/);
  return m ? m[1].toLowerCase() : null;
}

const sentences = splitSentences(body);
let runStart = 0;
let runWord = firstWord(sentences[0] ?? "");

for (let i = 1; i <= sentences.length; i++) {
  const w = firstWord(sentences[i] ?? "");
  if (w !== runWord || i === sentences.length) {
    const runLength = i - runStart;
    if (runLength >= 3 && runWord && runWord.length > 2) {
      // Stop-words that legitimately repeat (the, this, etc.) often appear
      // in dense prose; restrict triple-repetition flag to non-trivial openers.
      const STOPWORDS = new Set(["the", "this", "that", "a", "an", "i", "it", "in", "on", "at"]);
      if (!STOPWORDS.has(runWord)) {
        // Compute line number of the first sentence in the run
        const upTo = body.indexOf(sentences[runStart]);
        const lineNum = upTo >= 0 ? body.slice(0, upTo).split("\n").length : 0;
        add({
          severity: "warning",
          rule: "triple-repetition",
          line: lineNum,
          text: `${runLength} consecutive sentences open with "${runWord}". First: ${sentences[runStart].slice(0, 100)}${sentences[runStart].length > 100 ? "…" : ""}`,
          suggestion:
            "Vary the opening word/structure of at least one sentence in the run.",
        });
      }
    }
    runStart = i;
    runWord = w;
  }
}

// --------------------------------------------------------------------------
// Check 6: long sentences with parallel construction
// --------------------------------------------------------------------------
// Detect sentences over ~25 words that contain parallel-construction markers.
// These read smooth on first pass but often signal AI prose; splitting them
// produces more natural rhythm.

const PARALLEL_MARKERS = [
  /\beither\s+\w+/i,
  /\bnot\s+only\s+\w+/i,
  /\bon\s+the\s+one\s+hand/i,
  /\bwhether\s+\w+\s+or\s+\w+/i,
];

for (const sentence of sentences) {
  const wordCount = sentence.split(/\s+/).filter(Boolean).length;
  if (wordCount < 25) continue;

  for (const marker of PARALLEL_MARKERS) {
    if (marker.test(sentence)) {
      // Confirm a second-half parallel marker exists (or / but also / on the other hand)
      const hasSecondHalf =
        /\bor\b/.test(sentence) ||
        /\bbut\s+also\b/.test(sentence) ||
        /\bon\s+the\s+other\s+hand\b/.test(sentence);
      if (!hasSecondHalf) continue;

      const upTo = body.indexOf(sentence);
      const lineNum = upTo >= 0 ? body.slice(0, upTo).split("\n").length : 0;
      add({
        severity: "warning",
        rule: "long-parallel-construction",
        line: lineNum,
        text: `${wordCount} words, parallel construction: ${sentence.slice(0, 120)}${sentence.length > 120 ? "…" : ""}`,
        suggestion:
          "Long sentences with parallel construction read smooth but often signal AI prose. Consider splitting at the parallel marker into two sentences.",
      });
      break;
    }
  }
}

// --------------------------------------------------------------------------
// Check 7: quotation marks in prose (warning)
// --------------------------------------------------------------------------
// Per personal-tone → Quotation marks (provisional, n=1): avoid quotation marks
// in prose; name markers, labels, and terms without quoting them. Warning only
// (waivable — legitimate uses exist), so it never changes the exit code.
//
// Double quotes only (straight " and curly “ ”). Single quotes/apostrophes are
// excluded on purpose: flagging them would fire on every contraction. Inline
// code spans are masked and JSX/HTML attribute lines are skipped to avoid
// flagging component usage rather than prose.

function maskInlineCode(s) {
  return s.replace(/`[^`]*`/g, (m) => " ".repeat(m.length));
}

const doubleQuoteRegex = /["“”]/g;

lines.forEach((line, idx) => {
  const masked = maskInlineCode(line);
  // Skip lines that are JSX/HTML tags or carry attributes (component usage).
  if (/^\s*<\/?[A-Za-z]/.test(masked) || /\w+=["'“]/.test(masked)) return;
  const matches = masked.match(doubleQuoteRegex);
  if (!matches) return;
  add({
    severity: "warning",
    rule: "quotation-marks",
    line: idx + 1,
    text: `${matches.length} quotation mark(s) in: ${line.trim().slice(0, 120)}${line.length > 120 ? "…" : ""}`,
    suggestion:
      "personal-tone: avoid quotation marks in prose; name the marker/label/term without quoting. Waivable.",
  });
});

// --------------------------------------------------------------------------
// Report
// --------------------------------------------------------------------------

const critical = findings.filter((f) => f.severity === "critical");
const warning = findings.filter((f) => f.severity === "warning");

console.log(`# check-blog-prose findings — ${filePath}`);
console.log("");
console.log(`Critical: ${critical.length}  |  Warning: ${warning.length}`);
console.log("");

if (findings.length === 0) {
  console.log("No findings. Clean pass.");
  process.exit(0);
}

const byRule = {};
for (const f of findings) {
  byRule[f.rule] ??= [];
  byRule[f.rule].push(f);
}

for (const [rule, items] of Object.entries(byRule)) {
  console.log(`## ${rule} (${items.length})`);
  console.log("");
  for (const item of items) {
    console.log(`  L${item.line} [${item.severity}] ${item.text}`);
    if (item.suggestion) console.log(`         → ${item.suggestion}`);
  }
  console.log("");
}

process.exit(critical.length > 0 ? 1 : 0);
