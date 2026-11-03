# LiquidTable

A data table with glass or Finder-style appearance, row selection and custom cell contents.

## Example

```tsx
"use client";

import { LiquidTable } from "@justfrenzy/liquid-glass";

export function LiquidTableExample() {
  return (
    <LiquidTable aria-label="Files" columns={[{ id: "name", label: "Name", isRowHeader: true }]} rows={[{ id: "brief", values: { name: "Project brief" } }]} selectionMode="multiple" selectionAppearance="subtle" />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<TableRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `className` | No | `string` |  |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onClick` | No | `MouseEventHandler<HTMLTableElement>` |  |
| `selectionMode` | No | `SelectionMode` | The type of selection that is allowed in the collection. |
| `selectedKeys` | No | `"all" \| Iterable<Key>` | The currently selected keys in the collection (controlled). |
| `onSelectionChange` | No | `(keys: Selection) => void` | Handler that is called when the selection changes. |
| `columns` | Yes | `LiquidTableColumn[]` |  |
| `rows` | Yes | `LiquidTableRow[]` |  |
| `glass` | No | `GlassConfig` |  |
| `isDisabled` | No | `boolean` |  |
| `appearance` | No | `"glass" \| "finder"` |  |
| `selectionAppearance` | No | `"subtle" \| "blue"` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidTable } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidTable>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
