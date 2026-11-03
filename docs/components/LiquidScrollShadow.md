# LiquidScrollShadow

Use LiquidScrollShadow in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidScrollShadow } from "@justfrenzy/liquid-glass/heroui";

export function LiquidScrollShadowExample() {
  return (
    <LiquidScrollShadow style={{ maxHeight: 160 }}><p>Place scrollable content here.</p></LiquidScrollShadow>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `CSSProperties` |  |
| `children` | No | `ReactNode` |  |
| `defaultChecked` | No | `boolean` |  |
| `defaultValue` | No | `string \| number \| readonly string[]` |  |
| `className` | No | `string` |  |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `ChangeEventHandler<HTMLDivElement, Element>` |  |
| `onReset` | No | `ReactEventHandler<HTMLDivElement>` |  |
| `onSubmit` | No | `SubmitEventHandler<HTMLDivElement>` |  |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidScrollShadow } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidScrollShadow>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
