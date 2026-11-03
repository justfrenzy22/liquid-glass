# LiquidTabs

Use LiquidTabs in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidTabs } from "@justfrenzy/liquid-glass";

export function LiquidTabsExample() {
  return (
    <LiquidTabs label="File views" items={[{ id: "files", label: "Files", content: <p>Your files</p> }, { id: "recent", label: "Recent", content: <p>Recent files</p> }]} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `StyleOrFunction<TabsRenderProps>` | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `className` | No | `string` | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `onSelectionChange` | No | `(key: Key) => void` | Handler that is called when the selection changes. |
| `isDisabled` | No | `boolean` | Whether the TabList is disabled. Shows that a selection exists, but is not available in that circumstance. |
| `selectedKey` | No | `Key` | The currently selected key in the collection (controlled). |
| `defaultSelectedKey` | No | `Key` | The initial selected keys in the collection (uncontrolled). |
| `items` | Yes | `LiquidTabItem[]` |  |
| `label` | Yes | `string` |  |
| `glass` | No | `GlassConfig` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidTabs } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidTabs>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
