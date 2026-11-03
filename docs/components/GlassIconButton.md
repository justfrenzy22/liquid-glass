# GlassIconButton

Use GlassIconButton in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { GlassIconButton } from "@justfrenzy/liquid-glass";

export function GlassIconButtonExample() {
  return (
    <GlassIconButton aria-label="Add file">+</GlassIconButton>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `disabled` | No | `boolean` |  |
| `name` | No | `string` |  |
| `type` | No | `"button" \| "submit" \| "reset"` |  |
| `value` | No | `string \| number \| readonly string[]` |  |
| `defaultChecked` | No | `boolean` |  |
| `defaultValue` | No | `string \| number \| readonly string[]` |  |
| `className` | No | `string` |  |
| `style` | No | `CSSProperties` |  |
| `aria-label` | Yes | `string` | Defines a string value that labels the current element. |
| `children` | No | `ReactNode` |  |
| `onChange` | No | `ChangeEventHandler<HTMLButtonElement, Element>` |  |
| `onReset` | No | `ReactEventHandler<HTMLButtonElement>` |  |
| `onSubmit` | No | `SubmitEventHandler<HTMLButtonElement>` |  |
| `onClick` | No | `MouseEventHandler<HTMLButtonElement>` |  |
| `glass` | No | `GlassConfig` |  |
| `loading` | No | `boolean` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassIconButton } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassIconButton>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
