# LiquidAccordion

Use LiquidAccordion in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidAccordion } from "@justfrenzy/liquid-glass";

export function LiquidAccordionExample() {
  return (
    <LiquidAccordion items={[{ id: "sharing", title: "Sharing", content: <p>Only you can access this folder.</p> }]} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `glass` | No | `GlassConfig` |  |
| `style` | No | `StyleOrFunction<DisclosureGroupRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `className` | No | `ClassNameOrFunction<DisclosureGroupRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `isDisabled` | No | `boolean` | Whether all items are disabled. |
| `items` | Yes | `{ id: string; title: string; content: ReactNode; }[]` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidAccordion } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidAccordion>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
