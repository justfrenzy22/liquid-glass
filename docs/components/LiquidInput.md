# LiquidInput

A labeled, single-line text field. Use inputProps for native input options such as placeholder.

## Example

```tsx
"use client";

import { LiquidInput } from "@justfrenzy/liquid-glass";

export function LiquidInputExample() {
  return (
    <LiquidInput label="Project name" inputProps={{ placeholder: "Name your project" }} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<TextFieldRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `defaultValue` | No | `string` | The default value (uncontrolled). |
| `className` | No | `ClassNameOrFunction<TextFieldRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(value: string) => void` | Handler that is called when the value changes. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `name` | No | `string` | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `isDisabled` | No | `boolean` | Whether the input is disabled. |
| `type` | No | `"search" \| "text" \| (string & {}) \| "tel" \| "url" \| "email" \| "password"` | The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). |
| `value` | No | `string` | The current value (controlled). |
| `isRequired` | No | `boolean` | Whether user input is required on the input before form submission. |
| `isInvalid` | No | `boolean` | Whether the value is invalid. |
| `label` | Yes | `string` |  |
| `glass` | No | `GlassConfig` |  |
| `inputProps` | No | `InputRootProps` |  |


## Controlled text

Use `value` and `onChange` together; the callback receives the text string, not an input event. Native input options belong in `inputProps`, for example `inputProps={{ placeholder: "Name", type: "email" }}`. Use `isRequired`, `isInvalid` and `isDisabled` for form states.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidInput } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidInput>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
