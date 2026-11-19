# Streamer Layout and Auto-Foley Reference

This document outlines track arrangements and audio foley coordination for streamer clipping.

## 9:16 Split Zone Coordinates

In normalized vertical coordinates where $(0, 0)$ is top-left and $(1, 1)$ is bottom-right:

| Element | Normalized Y Bounds | Height Fraction | Anchor |
|---|---|---|---|
| **Webcam Feed** | `0.04` to `0.40` | 0.36 | Top Center |
| **Divider / Captions** | `0.41` to `0.48` | 0.07 | Mid Center |
| **Gameplay Screen** | `0.49` to `0.96` | 0.47 | Bottom Center |
| **Safety Margins** | Outer 0.04 | — | Clamped |

## Foley Sound Effect Triggers

| Trigger Name | Pre-roll / Timing | Sound Asset | Volume Envelope | Purpose |
|---|---|---|---|---|
| `riser` | $t - 0.50\text{s}$ to $t$ | `/sfx/riser.wav` | Smooth ramp `0.0 -> 0.8` | Tension building before climax |
| `impact` | $t_{\text{peak}}$ | `/sfx/sub_impact.wav` | Instant attack, 0.45s decay | Hard punch on reaction or hit |
| `whoosh` | Scene cut or split transition | `/sfx/whoosh.wav` | Bell curve over 0.28s | Mask visual cuts or fast pans |
| `tap` | UI badge pop or subtitle highlight | `/sfx/tap.wav` | 0.12s micro-click | High-frequency clarity |
