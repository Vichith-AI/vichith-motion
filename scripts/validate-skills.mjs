#!/usr/bin/env node

/**
 * CI / Local Validator for AgentSkills.io specification compliance.
 * Validates:
 * 1. YAML frontmatter presence (--- delimiters)
 * 2. `name` matches parent folder name exactly in kebab-case
 * 3. `description` present and <= 1024 characters
 * 4. `license` present
 * 5. Total line count < 500 lines (recommended < 250 lines)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const skillsDir = path.join(rootDir, 'skills');

if (!fs.existsSync(skillsDir)) {
  console.error(`Error: Skills directory not found at ${skillsDir}`);
  process.exit(1);
}

const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
const skillFolders = entries.filter((e) => e.isDirectory()).map((e) => e.name);

let hasErrors = false;
let validatedCount = 0;

console.log(`\nValidating ${skillFolders.length} skills against AgentSkills.io specification...\n`);

for (const folder of skillFolders) {
  const skillFile = path.join(skillsDir, folder, 'SKILL.md');

  if (!fs.existsSync(skillFile)) {
    console.error(`[FAIL] ${folder}: Missing SKILL.md`);
    hasErrors = true;
    continue;
  }

  const content = fs.readFileSync(skillFile, 'utf8');
  const lines = content.split(/\r?\n/);
  const lineCount = lines.length;

  if (lineCount >= 500) {
    console.error(`[FAIL] ${folder}: File exceeds 500 lines (${lineCount} lines). Move large tables to references/.`);
    hasErrors = true;
  }

  // Parse YAML frontmatter
  if (!content.startsWith('---')) {
    console.error(`[FAIL] ${folder}: Missing opening YAML frontmatter '---'`);
    hasErrors = true;
    continue;
  }

  const secondDelimiter = content.indexOf('\n---', 3);
  if (secondDelimiter === -1) {
    console.error(`[FAIL] ${folder}: Missing closing YAML frontmatter '---'`);
    hasErrors = true;
    continue;
  }

  const rawFrontmatter = content.slice(3, secondDelimiter).trim();
  const fmLines = rawFrontmatter.split(/\r?\n/);
  const metadata = {};

  for (const line of fmLines) {
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (match) {
      metadata[match[1]] = match[2].trim();
    }
  }

  // Check 1: name matches folder
  if (!metadata.name) {
    console.error(`[FAIL] ${folder}: Frontmatter missing 'name'`);
    hasErrors = true;
  } else if (metadata.name !== folder) {
    console.error(`[FAIL] ${folder}: Name '${metadata.name}' does not match directory name '${folder}'`);
    hasErrors = true;
  }

  // Check 2: description
  if (!metadata.description) {
    console.error(`[FAIL] ${folder}: Frontmatter missing 'description'`);
    hasErrors = true;
  } else if (metadata.description.length > 1024) {
    console.error(`[FAIL] ${folder}: Description exceeds 1024 characters (${metadata.description.length} chars)`);
    hasErrors = true;
  }

  // Check 3: license
  if (!metadata.license) {
    console.error(`[FAIL] ${folder}: Frontmatter missing 'license'`);
    hasErrors = true;
  }

  if (!hasErrors) {
    console.log(`[PASS] ${folder} (name: ${metadata.name}, lines: ${lineCount}, desc: ${metadata.description.length} chars)`);
    validatedCount++;
  }
}

console.log(`\nResults: ${validatedCount} / ${skillFolders.length} skills valid.\n`);

if (hasErrors) {
  process.exit(1);
} else {
  console.log('All skills comply with AgentSkills.io specification!\n');
  process.exit(0);
}
