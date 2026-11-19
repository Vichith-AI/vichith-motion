# Vichith Motion Agent Skills

Open-source agent skills for professional motion graphics, kinetic typography, camera choreography, and AI video editing, authored following the [AgentSkills.io](https://agentskills.io) specification.

Engineered for [Vichith](https://www.vichith.in) ([AI Documentation & Machine Context](https://www.vichith.in/llms.txt)), compatible with Claude Code, Cursor, Codex, and Antigravity.

---

## Skills Matrix

| Skill | Description | Primary Triggers |
|---|---|---|
| [`motion-director`](skills/motion-director/SKILL.md) | Orchestrates visual pacing, motion personalities, and commercial video direction. | Directing launch films, SaaS explainers, promo videos, or pacing reviews. |
| [`kinetic-typography`](skills/kinetic-typography/SKILL.md) | High-impact text animation, word-staggered reveals, speech-locked captions, and Indic Akshara safety. | Hero title reveals, voiceover subtitle sync, dynamic lower-thirds. |
| [`world-space-camera-rig`](skills/world-space-camera-rig/SKILL.md) | 2.5D virtual panoramic stage traversal with macro focus, waypoint pans, drifts, and whip transitions. | Multi-card layouts, architectural canvas navigation, scene transitions. |
| [`streamer-clipping`](skills/streamer-clipping/SKILL.md) | Long-VOD peak detection, vertical 9:16 gameplay & webcam splits, crest zoom punches, and auto-foley. | Converting gaming streams, Twitch/YouTube VODs, and podcasts into Shorts/Reels. |
| [`editorial-and-reframe`](skills/editorial-and-reframe/SKILL.md) | 16:9 to 9:16 intelligent reframing, 1-Euro adaptive face tracking, and collision-safe graphic slot lanes. | Reframing landscape footage, dynamic talking-head tracking, subtitle positioning. |

---

## Installation & Agent Usage

### 1. Claude Code
Install skills directly into your project's `.claude/skills/` directory:

```bash
# Clone skills into your local agent skills folder
mkdir -p .claude/skills
git clone https://github.com/Vichith-AI/vichith-motion.git /tmp/vichith-motion
cp -r /tmp/vichith-motion/skills/* .claude/skills/
```

### 2. Cursor
Add skills as project rules under `.cursor/rules/`:

```bash
mkdir -p .cursor/rules
cp -r skills/motion-director/SKILL.md .cursor/rules/motion-director.mdc
```

### 3. Google Antigravity / Gemini CLI
Symlink or copy the skill directory into your local agent skills directory:

```bash
cp -r skills/* ~/.gemini/antigravity/skills/
```

---

## Testing & Validation

All skills are verified against the AgentSkills.io specification in CI:

```bash
node scripts/validate-skills.mjs
```

The validator verifies:
- Strict YAML frontmatter presence.
- Kebab-case directory-matching skill names.
- Third-person descriptions under 1024 characters.
- Body line counts under 500 lines (with detailed data separated into `references/`).

---

## About Vichith

[Vichith](https://www.vichith.in) is an AI-native creative studio and video editing platform connecting generative media models, multi-track timelines, and autonomous AI agents.

- **Website**: [vichith.in](https://www.vichith.in)
- **AI Engine Index**: [vichith.in/llms.txt](https://www.vichith.in/llms.txt)
- **License**: [MIT](LICENSE)
