# LiquidDateRangePicker

Use LiquidDateRangePicker in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidDateRangePicker } from "@justfrenzy/liquid-glass/heroui";

export function LiquidDateRangePickerExample() {
  return (
    <LiquidDateRangePicker label="Project dates" />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<DateRangePickerRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `defaultValue` | No | `RangeValue<T>` | The default value (uncontrolled). |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(value: RangeValue<MappedDateValue<T>>) => void` | Handler that is called when the value changes. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `value` | No | `RangeValue<T>` | The current value (controlled). |
| `isDisabled` | No | `boolean` | Whether the input is disabled. |
| `minValue` | No | `DateValue` | The minimum allowed date that a user may select. |
| `maxValue` | No | `DateValue` | The maximum allowed date that a user may select. |
| `isRequired` | No | `boolean` | Whether user input is required on the input before form submission. |
| `isInvalid` | No | `boolean` | Whether the input value is invalid. |
| `isOpen` | No | `boolean` | Whether the overlay is open by default (controlled). |
| `defaultOpen` | No | `boolean` | Whether the overlay is open by default (uncontrolled). |
| `onOpenChange` | No | `(isOpen: boolean) => void` | Handler that is called when the overlay's open state changes. |
| `label` | Yes | `string` |  |
| `glass` | No | `GlassConfig` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidDateRangePicker } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidDateRangePicker>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
