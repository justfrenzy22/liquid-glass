# LiquidSeparator

Use LiquidSeparator in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidSeparator } from "@justfrenzy/liquid-glass/heroui";

export function LiquidSeparatorExample() {
  return (
    <LiquidSeparator />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `className` | No | `string` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `style` | No | `CSSProperties` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. |
| `onClick` | No | `MouseEventHandler<HTMLElement>` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidSeparator } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidSeparator>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
