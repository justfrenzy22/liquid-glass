# LiquidNumberField

Use LiquidNumberField in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidNumberField } from "@justfrenzy/liquid-glass/heroui";

export function LiquidNumberFieldExample() {
  return (
    <LiquidNumberField label="Copies" defaultValue={1} minValue={1} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<NumberFieldRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `step` | No | `number` | The amount that the input value changes with each increment or decrement "tick". |
| `defaultValue` | No | `number` | The default value (uncontrolled). |
| `className` | No | `ClassNameOrFunction<NumberFieldRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(value: number) => void` | Handler that is called when the value changes. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `name` | No | `string` | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `value` | No | `number` | The current value (controlled). |
| `isDisabled` | No | `boolean` | Whether the input is disabled. |
| `minValue` | No | `number` | The smallest value allowed for the input. |
| `maxValue` | No | `number` | The largest value allowed for the input. |
| `isRequired` | No | `boolean` | Whether user input is required on the input before form submission. |
| `isInvalid` | No | `boolean` | Whether the input value is invalid. |
| `label` | Yes | `string` |  |
| `description` | No | `string` |  |
| `glass` | No | `GlassConfig` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidNumberField } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidNumberField>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
