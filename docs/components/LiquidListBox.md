# LiquidListBox

Use LiquidListBox in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidListBox } from "@justfrenzy/liquid-glass/heroui";

export function LiquidListBoxExample() {
  return (
    <LiquidListBox label="Folders" options={[{ id: "files", label: "Files" }, { id: "recent", label: "Recent" }]} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<ListBoxRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `className` | No | `string` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `selectionMode` | No | `SelectionMode` | The type of selection that is allowed in the collection. |
| `selectedKeys` | No | `"all" \| Iterable<Key>` | The currently selected keys in the collection (controlled). |
| `onSelectionChange` | No | `(keys: Selection) => void` | Handler that is called when the selection changes. |
| `label` | Yes | `string` |  |
| `options` | Yes | `LiquidDataOption[]` |  |
| `glass` | No | `GlassConfig` |  |
| `isDisabled` | No | `boolean` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidListBox } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidListBox>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
