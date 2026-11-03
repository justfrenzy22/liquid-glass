# LiquidToggleButton

Use LiquidToggleButton in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidToggleButton } from "@justfrenzy/liquid-glass/heroui";

export function LiquidToggleButtonExample() {
  return (
    <LiquidToggleButton onChange={(selected) => console.log(selected)}>Favorite</LiquidToggleButton>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<ToggleButtonRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `className` | No | `ClassNameOrFunction<ToggleButtonRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(isSelected: boolean) => void` | Handler that is called when the element's selection state changes. |
| `onClick` | No | `(e: MouseEvent<FocusableElement, MouseEvent>) => void` | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides additional event details for non-mouse interactions. |
| `isDisabled` | No | `boolean` | Whether the button is disabled. |
| `onPress` | No | `(e: PressEvent) => void` | Handler that is called when the press is released over the target. |
| `defaultSelected` | No | `boolean` | Whether the element should be selected (uncontrolled). |
| `isSelected` | No | `boolean` | Whether the element should be selected (controlled). |
| `glass` | No | `GlassConfig` |  |
| `children` | Yes | `ReactNode` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidToggleButton } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidToggleButton>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
