# LiquidCalendar

Use LiquidCalendar in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidCalendar } from "@justfrenzy/liquid-glass";

export function LiquidCalendarExample() {
  return (
    <LiquidCalendar label="Select a date" />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<CalendarRenderProps<"single">>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `defaultValue` | No | `T` | The default value (uncontrolled). |
| `className` | No | `ClassNameOrFunction<CalendarRenderProps<"single">>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(value: MappedDateValue<T>) => void` | Handler that is called when the value changes. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `selectionMode` | No | `"single"` | Whether single or multiple selection is enabled. |
| `isDisabled` | No | `boolean` | Whether the calendar is disabled. |
| `value` | No | `T` | The current value (controlled). |
| `minValue` | No | `DateValue` | The minimum allowed date that a user may select. |
| `maxValue` | No | `DateValue` | The maximum allowed date that a user may select. |
| `isInvalid` | No | `boolean` | Whether the current selection is invalid according to application logic. |
| `glass` | No | `GlassConfig` |  |
| `label` | Yes | `string` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidCalendar } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidCalendar>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
