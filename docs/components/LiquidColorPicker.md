# LiquidColorPicker

Use LiquidColorPicker in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidColorPicker } from "@justfrenzy/liquid-glass";

export function LiquidColorPickerExample() {
  return (
    <LiquidColorPicker label="Accent color" />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `defaultValue` | No | `string \| Color` | The default value (uncontrolled). |
| `onChange` | No | `(value: Color) => void` | Handler that is called when the value changes. |
| `value` | No | `string \| Color` | The current value (controlled). |
| `label` | Yes | `string` |  |
| `glass` | No | `GlassConfig` |  |
| `isDisabled` | No | `boolean` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidColorPicker } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidColorPicker>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
