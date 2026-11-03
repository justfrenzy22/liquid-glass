# LiquidTimeField

Use LiquidTimeField in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidTimeField } from "@justfrenzy/liquid-glass/heroui";

export function LiquidTimeFieldExample() {
  return (
    <LiquidTimeField label="Meeting time" />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<DateFieldRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `defaultValue` | No | `Time` | The default value (uncontrolled). |
| `className` | No | `ClassNameOrFunction<DateFieldRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(value: Time) => void` | Handler that is called when the value changes. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `name` | No | `string` | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `value` | No | `Time` | The current value (controlled). |
| `isDisabled` | No | `boolean` | Whether the input is disabled. |
| `minValue` | No | `TimeValue` | The minimum allowed time that a user may select. |
| `maxValue` | No | `TimeValue` | The maximum allowed time that a user may select. |
| `isRequired` | No | `boolean` | Whether user input is required on the input before form submission. |
| `isInvalid` | No | `boolean` | Whether the input value is invalid. |
| `glass` | No | `GlassConfig` |  |
| `label` | Yes | `string` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidTimeField } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidTimeField>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
