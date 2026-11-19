# Kinetic Typography Animation Primitives Reference

This document catalogs declarative text behaviors and their respective keyframe and spatial transform values.

## Entrance Primitives

| Primitive | Initial State | Final State | Default Duration | Best Use Case |
|---|---|---|---|---|
| `fade_rise` | `opacity: 0`, `translateY: +24px` | `opacity: 1`, `translateY: 0px` | 0.32s | Hero headlines, subheadings |
| `roll_in` | `opacity: 0`, `rotateX: 75deg`, `translateY: +30px` | `opacity: 1`, `rotateX: 0deg`, `translateY: 0px` | 0.28s | High-impact claims, slot wheels |
| `pop_in` | `opacity: 0`, `scale: 0.65` | `opacity: 1`, `scale: 1.0` (with 1.08 overshoot) | 0.24s | Metric badges, stat counters |
| `highlight_wipe` | `clipPath: inset(0 100% 0 0)` | `clipPath: inset(0 0 0 0)` | 0.35s | Emphasized keywords within sentences |
| `typewriter` | `visibleChars: 0` | `visibleChars: N` with blinking cursor | Calculated via character count | Terminal prompts, chat inputs |
| `slide_down` | `opacity: 0`, `translateY: -20px` | `opacity: 1`, `translateY: 0px` | 0.30s | Meta tags, author watermarks |

## Emphasis Behaviors

- **`highlight_wipe`**: Renders an animated high-contrast rectangular background pill behind the selected word token.
- **`pulse`**: Gentle single-cycle scale oscillation (`1.0 -> 1.08 -> 1.0`) synchronized with audio beat or peak energy.
- **`color_flash`**: Brief tint transition to the brand accent color over 0.18s.

## Exit Behaviors

Unless `exit: "none"` is explicitly specified, text units execute an exit transition 0.25s prior to scene termination:
- **`fade_out`**: Smooth opacity decline to 0.
- **`slide_down`**: Drops below the baseline with a masking wipe.
- **`pop_out`**: Rapid scale down to 0.8 with fade out.
