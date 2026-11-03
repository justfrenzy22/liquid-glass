# LiquidButton

A button with normal, clear-glass and colored-glass finishes. Uses HeroUI onPress for activation.

## Example

```tsx
"use client";

import { LiquidButton } from "@justfrenzy/liquid-glass";

export function LiquidButtonExample() {
  return (
    <LiquidButton appearance="colored" glassColor="#0878ed" onPress={() => console.log("Save")}>Save changes</LiquidButton>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<ButtonRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `className` | No | `ClassNameOrFunction<ButtonRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onClick` | No | `(e: MouseEvent<FocusableElement, MouseEvent>) => void` | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides additional event details for non-mouse interactions. |
| `name` | No | `string` | Submitted as a pair with the button's value as part of the form data. |
| `isDisabled` | No | `boolean` | Whether the button is disabled. |
| `onPress` | No | `(e: PressEvent) => void` | Handler that is called when the press is released over the target. |
| `value` | No | `string` | The value associated with the button's name when it's submitted with the form data. |
| `isIconOnly` | No | `boolean` | Square icon-only layout. Add an aria-label describing the action. |
| `children` | Yes | `ReactNode` |  |
| `type` | No | `"button" \| "submit" \| "reset" \| "icon"` | Use icon for a square icon-only button, or a standard HTML button type. |
| `glass` | No | `GlassConfig` |  |
| `appearance` | No | `"glass" \| "normal" \| "colored"` |  |
| `glassColor` | No | `string` |  |
| `classNames` | No | `{ root?: string; surface?: string; content?: string; }` | Tailwind classes for the root button, glass surface and label/content. |


## Choose an appearance

```tsx
<LiquidButton appearance="normal">Normal</LiquidButton>
<LiquidButton appearance="glass">Clear glass</LiquidButton>
<LiquidButton appearance="colored" glassColor="#0878ed">Blue glass</LiquidButton>
```

Use `isDisabled` to disable the button. Use `onPress` for mouse, touch and keyboard activation. A button defaults to an ordinary action; set `type="submit"` inside a form when it should submit. Only the optional `/native` entry retains `onClick` and `disabled` as its native button API. A button does not perform navigation, save data or submit an API request unless you provide that behavior.

## Size and icon-only buttons

Text buttons fit their label with 24px horizontal padding; there is no fixed minimum width. Set `className="w-full"` or your own width when needed. Use `type="icon"` with an SVG/icon child and an `aria-label` for a centered 56px square hit area. This renders HTML `type="button"`. For an icon-only submit or reset button, use `isIconOnly` together with `type="submit"` or `type="reset"`. All three appearances support icons. Tailwind root utilities such as `className="size-10"` can change the hit area; use `classNames.content` to customize the icon.

## Tailwind customization

Use `className` for root utilities and `classNames` for component parts. See the [Tailwind guide](../tailwind.md) for slot names, setup commands and complete custom component examples. Utilities override default component styles; inline `style` still takes precedence.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidButton } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidButton>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
