# GlassSwitch

Use GlassSwitch in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { GlassSwitch } from "@justfrenzy/liquid-glass";

export function GlassSwitchExample() {
  return (
    <GlassSwitch label="Automatic sync" defaultChecked />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `CSSProperties` |  |
| `step` | No | `string \| number` |  |
| `defaultChecked` | No | `boolean` |  |
| `defaultValue` | No | `string \| number \| readonly string[]` |  |
| `className` | No | `string` |  |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `ChangeEventHandler<HTMLInputElement, HTMLInputElement>` |  |
| `onReset` | No | `ReactEventHandler<HTMLInputElement>` |  |
| `onSubmit` | No | `SubmitEventHandler<HTMLInputElement>` |  |
| `onClick` | No | `MouseEventHandler<HTMLInputElement>` |  |
| `name` | No | `string` |  |
| `checked` | No | `boolean` |  |
| `disabled` | No | `boolean` |  |
| `max` | No | `string \| number` |  |
| `min` | No | `string \| number` |  |
| `value` | No | `string \| number \| readonly string[]` |  |
| `label` | Yes | `ReactNode` |  |
| `glass` | No | `GlassConfig` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassSwitch } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassSwitch>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
