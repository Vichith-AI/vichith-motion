---
name: motion-director
description: Orchestrates visual pacing, motion personalities, macro-to-micro camera choreography, and scene transitions for high-fidelity motion graphics. Use when directing or reviewing promotional videos, product launch films, SaaS explainers, and kinetic titles.
license: Apache-2.0
---

# Motion Director

Direct video scenes with deliberate visual pacing, structured camera choreography, and physical motion personalities.

## 1. Core Principles

1. **Physical Tactility**: UI components behave like physical materials with spring inertia and damping.
2. **Continuous Resting Motion**: No layer sits completely stationary during a scene. Active scenes maintain micro-drifts or ambient parallax.
3. **Pacing Discipline**: Commercial explainer scenes sustain punchy durations (1.8s to 2.8s) before camera travel or scene cuts.
4. **Hierarchical Entrances**: Key narrative focal points enter first, followed by supporting badges and context pins.

## 2. Motion Personalities

Before setting keyframes, select a single cohesive motion personality for the video:

- **Snap**: Rapid, punchy arrivals (0.25s–0.40s) using exponential ease-out curves (`cubic-bezier(0.16, 1, 0.3, 1)`). Minimal overshoot. Ideal for fast ads and tech releases.
- **Glide**: Graceful, elongated transitions (0.60s–1.20s) using quintic ease-out curves (`cubic-bezier(0.22, 1, 0.36, 1)`). Zero bounce. Ideal for luxury and narrative films.
- **Steady**: Clear, measured transitions (0.35s–0.60s) using cubic ease-out curves (`cubic-bezier(0.33, 1, 0.68, 1)`). Ideal for SaaS explainers and data visualizers.
- **Bounce**: Playful arrivals (0.30s–0.50s) with spring overshoot (`cubic-bezier(0.34, 1.56, 0.64, 1)`). Ideal for consumer tools and social clips.

See [Personalities and Timing Guide](references/personalities-and-timing.md) for full parameter curves.

## 3. Direction Workflow

Follow these steps sequentially when building a motion scene:

1. **Establish Stage World**: Set depth layers, background color palettes, and ground plane orientation.
2. **Anchor Focal Layout**: Position core hero elements before attaching context labels or badges.
3. **Sequence Entrances**: Stagger visual layers by 0.05s–0.08s to guide the viewer's eye along a clear hierarchy.
4. **Apply Micro-Interactions**: When showing interactive UI, animate tactile button compression on clicks (`scale: 1.0 -> 0.88 -> 1.04 -> 1.0`).
5. **Maintain Living Rest**: Apply subtle camera drift (`zoom: 1.0 -> 1.03` over scene duration) to avoid freeze frames.

## 4. Declarative MotionSpec Example

```json
{
  "$schema": "https://vichith.in/schemas/motion-spec.json",
  "personality": "steady",
  "scene": {
    "durationSecs": 2.6,
    "world": {
      "palette": "obsidian-glass",
      "lighting": "ambient-directional",
      "depthPlanes": 3
    },
    "camera": {
      "kind": "drift",
      "startZoom": 1.0,
      "endZoom": 1.03,
      "durationSecs": 2.6
    },
    "layers": [
      {
        "id": "hero-headline",
        "type": "text",
        "enter": {
          "type": "fade_rise",
          "staggerSecs": 0.06,
          "durationSecs": 0.4
        }
      },
      {
        "id": "interactive-pill",
        "type": "component",
        "component": "ui-prompt-card",
        "delaySecs": 0.35,
        "interaction": {
          "clickAtSecs": 1.2,
          "tactileScale": 0.88
        }
      }
    ]
  }
}
```
