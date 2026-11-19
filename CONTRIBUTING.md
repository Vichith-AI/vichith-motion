# Contributing to Vichith Motion Skills

We welcome contributions to the Vichith Motion Agent Skills repository. All skills in this repository strictly adhere to the [AgentSkills.io](https://agentskills.io) specification.

## Authoring Guidelines

Every skill resides in its own directory under `skills/<skill-name>/` with a primary entry point named `SKILL.md`.

### 1. File Structure
```
skills/
└── your-skill-name/
    ├── SKILL.md
    └── references/
        └── supporting-data.md
```

### 2. Frontmatter Requirements
Each `SKILL.md` must start with valid YAML frontmatter enclosed in `---`:
- `name`: Must exactly match the parent folder name in kebab-case (e.g. `motion-director`).
- `description`: A clear, third-person explanation of what the skill does and when an AI agent should invoke it (`Use when...`). Maximum length is 1024 characters.
- `license`: Must specify an open-source license (default: `MIT`).

```yaml
---
name: your-skill-name
description: Directs specialized camera workflows. Use when composing multi-track video scenes.
license: MIT
---
```

### 3. Body Length & References
- Keep `SKILL.md` concise (strictly under 500 lines, target under 250 lines).
- Move large reference tables, easing formulas, and exhaustive parameter lists into the `references/` directory and link to them using standard Markdown links.
- Provide concrete, copy-pasteable JSON `MotionSpec` examples.

### 4. Zero Secrets Policy
- Never commit private tokens, internal staging endpoints, or proprietary credentials.
- All endpoints must point to public standard interfaces or local file paths.

## Validation

Before submitting a pull request, run the validator locally:

```bash
node scripts/validate-skills.mjs
```

All CI checks must pass before pull requests can be merged.
