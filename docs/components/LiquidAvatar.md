# LiquidAvatar

Use LiquidAvatar in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidAvatar } from "@justfrenzy/liquid-glass";

export function LiquidAvatarExample() {
  return (
    <LiquidAvatar person={{ id: "alex", name: "Alex Morgan", initials: "AM" }} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `CSSProperties` |  |
| `defaultChecked` | No | `boolean` |  |
| `defaultValue` | No | `string \| number \| readonly string[]` |  |
| `className` | No | `string` |  |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `ChangeEventHandler<HTMLSpanElement, Element>` |  |
| `onReset` | No | `ReactEventHandler<HTMLSpanElement>` |  |
| `onSubmit` | No | `SubmitEventHandler<HTMLSpanElement>` |  |
| `onClick` | No | `MouseEventHandler<HTMLSpanElement>` |  |
| `glass` | No | `GlassConfig` |  |
| `person` | Yes | `LiquidPerson` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidAvatar } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidAvatar>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
