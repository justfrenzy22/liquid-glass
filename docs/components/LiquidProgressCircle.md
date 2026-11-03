# LiquidProgressCircle

Use LiquidProgressCircle in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidProgressCircle } from "@justfrenzy/liquid-glass";

export function LiquidProgressCircleExample() {
  return (
    <LiquidProgressCircle aria-label="Upload progress" value={40} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `glass` | No | `GlassConfig` |  |
| `style` | No | `StyleOrFunction<ProgressBarRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `className` | No | `ClassNameOrFunction<ProgressBarRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `value` | No | `number` | The current value (controlled). |
| `minValue` | No | `number` | The smallest value allowed for the input. |
| `maxValue` | No | `number` | The largest value allowed for the input. |
| `isIndeterminate` | No | `boolean` | Whether presentation is indeterminate when progress isn't known. |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidProgressCircle } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidProgressCircle>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
