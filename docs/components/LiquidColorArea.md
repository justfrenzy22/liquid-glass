# LiquidColorArea

Use LiquidColorArea in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidColorArea } from "@justfrenzy/liquid-glass/heroui";

export function LiquidColorAreaExample() {
  return (
    <LiquidColorArea label="Choose a color" />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<ColorAreaRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `defaultValue` | No | `string \| Color` | The default value (uncontrolled). |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(value: Color) => void` | Handler that is called when the value changes, as the user drags. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `value` | No | `string \| Color` | The current value (controlled). |
| `isDisabled` | No | `boolean` | Whether the ColorArea is disabled. |
| `label` | Yes | `string` |  |
| `glass` | No | `GlassConfig` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidColorArea } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidColorArea>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
