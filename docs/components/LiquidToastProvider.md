# LiquidToastProvider

Mount once near the application root to display notifications created with the toast helper.

## Example

```tsx
"use client";

import { LiquidToastProvider } from "@justfrenzy/liquid-glass";

export function LiquidToastProviderExample() {
  return (
    <LiquidToastProvider />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `glass` | No | `GlassConfig` |  |
| `style` | No | `StyleOrFunction<ToastRegionRenderProps<ToastContentValue>>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `className` | No | `ClassNameOrFunction<ToastRegionRenderProps<ToastContentValue>>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | An accessibility label for the toast region. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |


## Trigger a notification

Import `toast` from `/heroui` and call `toast.success("Saved")` from an event handler. Mount one provider near your app root; it is not a wrapper for children.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidToastProvider } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidToastProvider>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
