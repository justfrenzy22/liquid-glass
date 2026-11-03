# LiquidFieldset

Use LiquidFieldset in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidFieldset } from "@justfrenzy/liquid-glass/heroui";

export function LiquidFieldsetExample() {
  return (
    <LiquidFieldset legend="Folder settings"><p>Place related form controls here.</p></LiquidFieldset>
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
| `defaultChecked` | No | `boolean` |  |
| `defaultValue` | No | `string \| number \| readonly string[]` |  |
| `className` | No | `string` |  |
| `style` | No | `CSSProperties` |  |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `children` | Yes | `ReactNode` |  |
| `onChange` | No | `ChangeEventHandler<HTMLFieldSetElement, Element>` |  |
| `onReset` | No | `ReactEventHandler<HTMLFieldSetElement>` |  |
| `onSubmit` | No | `SubmitEventHandler<HTMLFieldSetElement>` |  |
| `onClick` | No | `MouseEventHandler<HTMLFieldSetElement>` |  |
| `legend` | Yes | `string` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidFieldset } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidFieldset>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
