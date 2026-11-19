---
name: editorial-and-reframe
description: Reframes horizontal 16:9 footage into vertical 9:16 mobile formats using 1-Euro adaptive subject tracking, collision-safe slot lanes, and title-safe boundary enforcement. Use when adapting widescreen videos, reframing talking heads, or positioning graphic overlays.
license: MIT
---

# Editorial and Reframe

Intelligently adapt landscape (16:9) video footage into vertical (9:16) compositions while keeping active subjects perfectly framed and graphics free from overlap.

## 1. 1-Euro Adaptive Subject Tracking

Naive camera framing on raw bounding boxes causes severe jitter during slow movements and lag during fast turns. The tracking engine uses a 1-Euro adaptive low-pass filter:

- **Filter Tuning**:
  - `minCutoff = 1.0`: Suppresses high-frequency micro-shakes when the speaker is resting.
  - `beta = 0.007`: Dynamically reduces filtering latency when velocity spikes, preventing tracking lag.
  - `dCutoff = 1.0`: Derivative filter cutoff for reliable velocity estimation.
- **Anchor Offsets**: Layers can lock to dynamic subject landmarks:
  - `above_head`: Floating name tags and speaker labels ($y_{\text{top}} - 0.05$).
  - `flank_left` / `flank_right`: Automatically detects the open space opposite the speaker's face direction.

## 2. Collision-Safe Slot Lanes

When multiple text blocks, badges, or lower-thirds target the same visual sector, slot lanes prevent collisions through deterministic stacking:

- **Top Lane**: Stacks downward (`top_center` hero remains at anchor; subheadings push downwards with a `0.018` gap).
- **Bottom Lane**: Stacks upward (`bottom_center` captions stay pinned to safe baseline; tags push upwards).
- **Safe Zone Boundary**: A mandatory `0.06` margin (6% viewport inset) protects text from being cropped by mobile app chrome or rounded screen corners.

## 3. Reframe Workflow

1. **Analyze Video Trajectory**: Ingest subject bounding boxes across the timeline.
2. **Smooth Trajectory**: Pass coordinates through `OneEuroFilter` to generate smooth pan-and-scan focal points.
3. **Calculate Crop Window**: Center the 9:16 window on the smoothed coordinate while clamping within the source 16:9 frame.
4. **Assign Graphic Slots**: Place captions, watermarks, and callouts into distinct semantic slots (`top_center`, `bottom_center`).

## 4. Declarative MotionSpec Example

```json
{
  "$schema": "https://vichith.in/schemas/motion-spec.json",
  "reframe": {
    "sourceAspect": "16:9",
    "targetAspect": "9:16",
    "subjectTracking": {
      "target": "speaker_face",
      "filter": "1-euro",
      "params": { "minCutoff": 1.0, "beta": 0.007 },
      "leadRoom": 0.04
    },
    "slots": [
      {
        "id": "speaker-badge",
        "slot": "top_center",
        "height": 0.06,
        "priority": 0
      },
      {
        "id": "episode-tag",
        "slot": "top_center",
        "height": 0.035,
        "priority": 1
      },
      {
        "id": "synced-captions",
        "slot": "bottom_center",
        "height": 0.08,
        "priority": 0
      }
    ]
  }
}
```
