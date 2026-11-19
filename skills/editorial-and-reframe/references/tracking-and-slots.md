# Tracking Filter and Slot Lanes Reference

This document provides mathematical formulations for the 1-Euro smoothing filter and layout collision resolution.

## 1-Euro Filter Formulation

The adaptive filter balances jitter reduction with low lag:

$$\alpha = \frac{1}{1 + \frac{\tau}{T_e}}$$
where $T_e = \frac{1}{f_s}$ (sampling period) and $\tau = \frac{1}{2\pi \cdot f_c}$.

The dynamic cutoff frequency $f_c$ scales linearly with signal velocity $\dot{X}$:
$$f_c = f_{c,\text{min}} + \beta \cdot |\dot{X}|$$

Default parameters:
- $f_{c,\text{min}} = 1.0\text{ Hz}$
- $\beta = 0.007$
- $f_{c,\text{deriv}} = 1.0\text{ Hz}$

## Semantic Placement Slots

| Slot Name | Default Screen X | Default Screen Y | Stacking Flow |
|---|---|---|---|
| `top_left` | 0.06 | 0.06 | Downward |
| `top_center` | 0.50 | 0.06 | Downward |
| `top_right` | 0.94 | 0.06 | Downward |
| `middle_left` | 0.06 | 0.50 | Horizontal / Right |
| `center` | 0.50 | 0.50 | Concentric / Scale |
| `middle_right` | 0.94 | 0.50 | Horizontal / Left |
| `bottom_left` | 0.06 | 0.94 | Upward |
| `bottom_center` | 0.50 | 0.94 | Upward |
| `bottom_right` | 0.94 | 0.94 | Upward |
| `auto_clear_subject` | Opposite to face vector | 0.50 | Flank adaptive |
