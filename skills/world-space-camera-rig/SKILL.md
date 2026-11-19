---
name: world-space-camera-rig
description: Controls 2.5D cinematographic camera trajectories across virtual panoramic stages using focus zooms, waypoint pans, resting drifts, and whip transitions. Use when framing complex multi-card UI layouts, architectural diagrams, or scene-to-scene camera travel.
license: Apache-2.0
---

# World-Space Camera Rig

Operate a virtual cinematographic camera traversing expanded 2D/2.5D stages. Instead of jumping abruptly between disparate scenes, the camera navigates a continuous coordinate space.

## 1. Virtual Expanded Stages

Rather than confining all assets within a single 1.0 × 1.0 normalized frame, stage layouts can span expanded dimensions (e.g. 2.0x to 3.0x viewport width):

- **Origin Center**: (0.5, 0.5) represents standard viewport center.
- **Off-Screen Nodes**: Contextual cards, architectural flows, or timeline diagrams live at coordinates such as `x: 1.4` or `x: -0.6`.
- **Coordinate Normalization**: Camera `(x, y, zoom)` positions frame specific regions dynamically over time.

## 2. Semantic Camera Moves

The camera rig implements 4 canonical moves:

1. **`focus_on`**:
   - Zooms in tightly on a target layer (`zoom: 2.0` to `2.6`) to inspect fine detail.
   - Holds on the focal element for 0.8s–1.4s.
   - Smoothly pulls back (`zoom: 1.0`) to reveal the broader context.
2. **`pan_between`**:
   - Glides smoothly across a series of spatial waypoints.
   - Interpolates coordinates using acceleration-deceleration curves (`cubic-bezier(0.65, 0, 0.35, 1)`).
3. **`drift`**:
   - Ambient resting movement (e.g. slow forward dolly `zoom: 1.0 -> 1.04` or lateral float at `0.015` frame units/sec).
   - Eliminates frozen dead air while information is being consumed.
4. **`whip`**:
   - High-velocity directional transition between distant nodes (duration ~0.22s).
   - Simulates motion blur smear during the apex of movement.

See [Camera Mathematics and Projection Reference](references/camera-math.md) for coordinate transformation formulas.

## 3. Workflow Steps

1. **Define Virtual Stage Bounds**: Set overall width and height factors (e.g. `width: 2.4, height: 1.0`).
2. **Position Spatial Landmarks**: Lay out cards or visual nodes at discrete waypoints along the canvas.
3. **Program Camera Keyframes**: Define camera movements with appropriate hold times and transitions.
4. **Tune Ease Curves**: Ensure deceleration curves match the selected film personality.

## 4. Declarative MotionSpec Example

```json
{
  "$schema": "https://vichith.in/schemas/motion-spec.json",
  "cameraRig": {
    "stage": { "width": 2.5, "height": 1.2 },
    "initialPosition": { "x": 0.5, "y": 0.5, "zoom": 1.0 },
    "sequence": [
      {
        "move": "focus_on",
        "targetLayerId": "code-editor-card",
        "atSecs": 0.3,
        "zoom": 2.2,
        "durationSecs": 0.65,
        "holdSecs": 1.1,
        "pullbackZoom": 1.0
      },
      {
        "move": "pan_between",
        "atSecs": 2.2,
        "waypoints": [
          { "x": 1.4, "y": 0.5, "zoom": 1.15, "holdSecs": 0.8 },
          { "x": 2.1, "y": 0.5, "zoom": 1.0, "holdSecs": 1.0 }
        ],
        "transitionSecs": 0.75
      },
      {
        "move": "drift",
        "direction": "push",
        "speed": 0.012,
        "durationSecs": 1.5
      }
    ]
  }
}
```
