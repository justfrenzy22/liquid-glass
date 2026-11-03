# GlassSwitch

The same component as LiquidSwitch, with identical props and liquid design. This name is an alias, not a simpler visual variant.

## Example

```tsx
"use client";

import { GlassSwitch } from "@justfrenzy/liquid-glass";

export function GlassSwitchExample() {
  return (
    <GlassSwitch label="Automatic sync" defaultSelected />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<SwitchFieldRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `className` | No | `ClassNameOrFunction<SwitchFieldRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(isSelected: boolean) => void` | Handler that is called when the element's selection state changes. |
| `onClick` | No | `(e: MouseEvent<FocusableElement, MouseEvent>) => void` | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides additional event details for non-mouse interactions. |
| `name` | No | `string` | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `isDisabled` | No | `boolean` | Whether the input is disabled. |
| `onPress` | No | `(e: PressEvent) => void` | Handler that is called when the press is released over the target. |
| `value` | No | `string` | The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). |
| `defaultSelected` | No | `boolean` | Whether the element should be selected (uncontrolled). |
| `isSelected` | No | `boolean` | Whether the element should be selected (controlled). |
| `isRequired` | No | `boolean` | Whether user input is required on the input before form submission. |
| `isInvalid` | No | `boolean` | Whether the input value is invalid. |
| `label` | Yes | `string` |  |
| `glass` | No | `GlassConfig` |  |
| `forceActive` | No | `boolean` |  |


## Shared design

See [LiquidSwitch](LiquidSwitch.md) for the main usage guide. Import either name from the package root; they render exactly the same component. Choose normal, glass or colored appearance through props where supported, not by switching prefixes. For the previous native API, explicitly import from `@justfrenzy/liquid-glass/native`.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassSwitch } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassSwitch>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
