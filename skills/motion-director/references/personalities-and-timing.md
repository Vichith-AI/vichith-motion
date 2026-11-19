# Motion Personalities and Timing Reference

This document provides numerical specifications for each motion personality supported by the Vichith motion engine.

## Numerical Personality Matrix

| Personality | Primary Target | Arrival Window | Default Easing Curve | Stagger Step | Scene Duration | Camera Ambient Rest |
|---|---|---|---|---|---|---|
| **Snap** | Tech launches, trailers, short-form hype | 0.25s – 0.40s | `cubic-bezier(0.16, 1, 0.3, 1)` | 0.03s – 0.05s | 1.0s – 2.5s | Punch push on beats |
| **Glide** | Premium hardware, editorial, cinematic narratives | 0.60s – 1.20s | `cubic-bezier(0.22, 1, 0.36, 1)` | 0.08s – 0.15s | 3.0s – 5.0s | Continuous gentle drift |
| **Steady** | SaaS workflows, product walkthroughs, finance | 0.35s – 0.60s | `cubic-bezier(0.33, 1, 0.68, 1)` | 0.05s – 0.08s | 2.0s – 3.8s | Waypoint pans between nodes |
| **Bounce** | Social shorts, consumer mobile apps, gaming | 0.30s – 0.50s | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.04s – 0.07s | 1.5s – 3.0s | Dynamic micro-pulsing |

## Tactile Click Dynamics

Interactive elements (such as send buttons, checkboxes, and tabs) must convey physical tactile feedback rather than artificial shockwaves:

```
t0 = clickTime - 0.02s : scale = 1.00
t1 = clickTime         : scale = 0.88 (inward tactile compression)
t2 = clickTime + 0.12s : scale = 1.05 (inertial spring rebound)
t3 = clickTime + 0.22s : scale = 1.00 (settled rest)
```
