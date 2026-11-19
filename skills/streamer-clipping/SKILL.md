---
name: streamer-clipping
description: Detects viral peaks in long gameplay or livestream VODs, frames vertical 9:16 webcam and gameplay split layouts, and triggers crest-driven zoom punches with synchronized audio foley. Use when converting gaming streams, podcasts, or VODs into viral vertical shorts.
license: MIT
---

# Streamer Clipping

Transform multi-hour widescreen (16:9) gameplay streams and creator VODs into high-retention vertical (9:16) clips for TikTok, YouTube Shorts, and Instagram Reels.

## 1. Viral Hook & Peak Detection

The clipping pipeline identifies candidate clips by scanning for multi-signal intensity spikes:

- **Audio Energy Bursts**: Volume peaks $> +6\text{dB}$ over running median (laughter, shouts, sudden audio silence followed by loud reaction).
- **Face Emotion Changes**: High eyebrow elevation or rapid head movements detected via facial landmarks.
- **Visual Action Density**: High optical flow vector changes (in-game explosions, quick flick shots, sudden UI score popups).
- **Duration Window**: Target duration between 18s and 45s, anchored by a strong 3-second hook at the start.

## 2. 9:16 Split-Screen Layout Geometry

Vertical gaming shorts require dynamic dual-zone framing:

- **Webcam Zone (Upper 35%–42%)**:
  - Pinned to the streamer's face with 1-Euro smoothed head tracking.
  - Aspect ratio clamped to 4:3 or 16:9 crop, centered at $y = 0.22$.
- **Gameplay Focus Zone (Lower 58%–65%)**:
  - Framed around the crosshair, active game action, or critical minimap area.
  - Centered at $y = 0.70$.
- **Middle Caption Lane**: Safe band reserved for word-synced kinetic subtitles between the two video panes ($y = 0.42$ to $0.48$).

## 3. Crest-Driven Zoom Punches & Auto-Foley

On explosive punchlines or climax moments, the camera delivers a punch zoom synchronized with procedural sound design:

1. **Pre-Impact Riser**: At $t = t_{\text{peak}} - 0.45\text{s}$, schedule a tension riser sound effect and duck background audio by 6dB.
2. **Impact Apex**: At $t = t_{\text{peak}}$, trigger a 1.25x zoom punch on the gameplay or reaction frame with an instantaneous bass impact hit.
3. **Recovery Settle**: Camera recovers to 1.0x over 0.35s using an elastic spring curve.

See [Layout and Foley Timing Reference](references/layout-and-foley.md) for track configurations.

## 4. Declarative MotionSpec Example

```json
{
  "$schema": "https://vichith.in/schemas/motion-spec.json",
  "pipeline": "streamer-clip",
  "clipWindow": { "startSecs": 1420.5, "endSecs": 1452.0 },
  "layout": {
    "format": "9:16",
    "webcam": {
      "slot": "top_center",
      "heightFraction": 0.38,
      "headTrackFilter": "one_euro",
      "border": { "width": 2, "color": "#1f2937" }
    },
    "gameplay": {
      "slot": "bottom_center",
      "heightFraction": 0.62,
      "focusRegion": "reticle_center"
    }
  },
  "dynamics": [
    {
      "trigger": "peak_crest",
      "timeSecs": 1438.2,
      "cameraPunch": {
        "target": "webcam",
        "scale": 1.22,
        "durationSecs": 0.32
      },
      "foley": {
        "riserAtSecs": 1437.7,
        "impactAtSecs": 1438.2,
        "duckMusicDb": -8
      }
    }
  ]
}
```
