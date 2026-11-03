# LiquidCloseButton

Use LiquidCloseButton in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidCloseButton } from "@justfrenzy/liquid-glass";

export function LiquidCloseButtonExample() {
  return (
    <LiquidCloseButton aria-label="Close panel" onPress={() => console.log("Close")} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `className` | No | `ClassNameOrFunction<ButtonRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onClick` | No | `(e: MouseEvent<FocusableElement, MouseEvent>) => void` | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides additional event details for non-mouse interactions. |
| `name` | No | `string` | Submitted as a pair with the button's value as part of the form data. |
| `isDisabled` | No | `boolean` | Whether the button is disabled. |
| `onPress` | No | `(e: PressEvent) => void` | Handler that is called when the press is released over the target. |
| `type` | No | `"button" \| "submit" \| "reset"` | The behavior of the button when used in an HTML form. |
| `value` | No | `string` | The value associated with the button's name when it's submitted with the form data. |
| `children` | No | `ChildrenOrFunction<ButtonRenderProps>` | The children of the component. A function may be provided to alter the children based on component state. |
| `style` | No | `StyleOrFunction<ButtonRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `glass` | No | `GlassConfig` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidCloseButton } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidCloseButton>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
