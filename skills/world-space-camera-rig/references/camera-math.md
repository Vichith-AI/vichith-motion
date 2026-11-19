# Camera Mathematics and Projection Reference

This document details the viewport projection formulas and keyframe interpolation algorithms used by the world-space camera rig.

## Coordinate Normalization

A camera pose is specified as:
$$C = (X_c, Y_c, Z_{zoom}, \theta_{tilt})$$

Given a layer with normalized world bounds $[x_w, y_w, w_w, h_w]$ and aspect ratio $A = W / H$:

1. **Center Offset Calculation**:
   $$\Delta x = x_w + \frac{w_w}{2} - X_c$$
   $$\Delta y = y_w + \frac{h_w}{2} - Y_c$$

2. **Viewport Frame Projection**:
   $$x_{screen} = 0.5 + (\Delta x \cdot Z_{zoom})$$
   $$y_{screen} = 0.5 + (\Delta y \cdot Z_{zoom})$$

3. **Projected Dimensions**:
   $$w_{screen} = w_w \cdot Z_{zoom}$$
   $$h_{screen} = h_w \cdot Z_{zoom}$$

## Transition Easing Functions

- **Macro Focus (`focus_on`)**: Uses exponential ease-out to rapidly arrive at the macro crop without jarring deceleration:
  $$\text{curve} = \text{cubic-bezier}(0.16, 1.0, 0.3, 1.0)$$
- **Waypoint Traversal (`pan_between`)**: Uses smooth acceleration-deceleration to feel like a steady robotic dolly:
  $$\text{curve} = \text{cubic-bezier}(0.65, 0.0, 0.35, 1.0)$$
- **Directional Smear (`whip`)**: Extreme ease-in followed by abrupt clamp:
  $$\text{curve} = \text{cubic-bezier}(0.85, 0.0, 0.15, 1.0)$$
