# LiquidSelect

Use LiquidSelect in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidSelect } from "@justfrenzy/liquid-glass/heroui";

export function LiquidSelectExample() {
  return (
    <LiquidSelect label="Folder" options={[{ id: "files", label: "Files" }, { id: "recent", label: "Recent" }]} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<SelectRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `defaultValue` | No | `Key` | The default value (uncontrolled). |
| `className` | No | `ClassNameOrFunction<SelectRenderProps>` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `(value: Key) => void` | Handler that is called when the value changes. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `name` | No | `string` | The name of the input, used when submitting an HTML form. |
| `value` | No | `Key` | The current value (controlled). |
| `selectionMode` | No | `"single"` | Whether single or multiple selection is enabled. |
| `onSelectionChange` | No | `(key: Key) => void` | Handler that is called when the selection changes. |
| `isDisabled` | No | `boolean` | Whether the input is disabled. |
| `isRequired` | No | `boolean` | Whether user input is required on the input before form submission. |
| `isInvalid` | No | `boolean` | Whether the input value is invalid. |
| `selectedKey` | No | `Key` | The currently selected key in the collection (controlled). |
| `defaultSelectedKey` | No | `Key` | The initial selected key in the collection (uncontrolled). |
| `isOpen` | No | `boolean` | Sets the open state of the menu. |
| `defaultOpen` | No | `boolean` | Sets the default open state of the menu. |
| `onOpenChange` | No | `(isOpen: boolean) => void` | Method that is called when the open state of the menu changes. |
| `label` | Yes | `string` |  |
| `options` | Yes | `LiquidSelectOption[]` |  |
| `glass` | No | `GlassConfig` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidSelect } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidSelect>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
