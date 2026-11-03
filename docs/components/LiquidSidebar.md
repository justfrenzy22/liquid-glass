# LiquidSidebar

A composable sidebar with optional navigation links, top content, primary actions, custom body and footer.

## Example

```tsx
"use client";

import { LiquidSidebar } from "@justfrenzy/liquid-glass";

export function LiquidSidebarExample() {
  return (
    <LiquidSidebar items={[{ id: "files", label: "Files", href: "/files" }, { id: "recent", label: "Recent", href: "/recent" }]} activeKey="files" onNavigate={(id) => console.log(id)} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `label` | No | `string` |  |
| `className` | No | `string` |  |
| `appearance` | No | `LiquidNavigationAppearance` |  |
| `glass` | No | `GlassConfig` |  |
| `activeKey` | No | `string` |  |
| `onNavigate` | No | `(key: string) => void` |  |
| `items` | No | `LiquidNavigationItem[]` | Optional navigation links. Omit when supplying a fully custom body. |
| `heading` | No | `string` | Optional visible heading. Omit it for a sidebar without a title row. |
| `header` | No | `ReactNode` | Content at the top, above actions and navigation (for example a logo or skeleton). |
| `actions` | No | `ReactNode` | Primary actions below the header and above the navigation. |
| `children` | No | `ReactNode` | Custom body content below the optional navigation links. |
| `footer` | No | `ReactNode` | Bottom content, outside the scrollable body. |
| `style` | No | `CSSProperties` | Root sizing and styling, such as width and height. |
| `classNames` | No | `Partial<Record<"body" \| "footer" \| "header" \| "heading" \| "navigation" \| "content" \| "container" \| "surface" \| "item" \| "actions" \| "headingRow" \| "collapseButton", string>>` | Tailwind classes for individual sidebar slots. |
| `isCollapsed` | No | `boolean` |  |
| `onCollapsedChange` | No | `(collapsed: boolean) => void` |  |


## Collapse and routing

For an interactive collapse control, keep `isCollapsed` in `useState` and pass its setter as `onCollapsedChange`. Items use ordinary links: `onNavigate` reports an ID but does not cancel navigation. Match `activeKey` to the current route. `appearance` accepts `"normal"`, `"glass"`, or `"colored"`.

## Controlled collapse example

```tsx
"use client";

import { useState } from "react";
import { LiquidSidebar } from "@justfrenzy/liquid-glass";

export function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <LiquidSidebar
      items={[{ id: "files", label: "Files", href: "/files" }]}
      activeKey="files"
      isCollapsed={collapsed}
      onCollapsedChange={setCollapsed}
      footer={<span>Your workspace</span>}
    />
  );
}
```

## Put components inside the sidebar

Use `header` for top content such as a skeleton or logo, `actions` for buttons above navigation, `children` for custom body sections, and `footer` for bottom content. Each accepts React components. `items` is optional navigation data; omit it for a fully custom sidebar. Slots other than item icons and the collapse control are hidden when collapsed. See the complete [sidebar New Folder modal recipe](https://github.com/justfrenzy22/liquid-glass/blob/main/docs/recipes/sidebar-new-folder.md) for an example with a working form and local folder state. `LiquidModal` renders its own trigger button, so place the modal itself in `actions` (or `footer` for a bottom action).

## Optional heading

The sidebar has no visible heading by default in version 0.2.1 and newer. Omit `heading` to start directly with navigation links. Set `heading="Workspace"` (or any text) only when you want a title. Empty or whitespace-only strings are treated as no heading. Without a heading or collapse control, no empty title row is rendered. A collapse button remains available when `onCollapsedChange` is supplied.

Use `label="Project navigation"` for a screen-reader name without adding visible text. The default accessible label is "Sidebar navigation".

## Layout and sizing

Expanded order: optional heading/collapse row, `header`, `actions`, navigation `items`, custom `children`, then `footer`. Omitted slots do not leave empty placeholder rows. Set root `style` or `className` for sizing; for example `style={{ width: 260, height: "100dvh" }}`. The body scrolls inside a fixed-height sidebar while top content, actions and footer stay in place. On narrow screens the default width becomes 100%; an explicit inline width overrides that.

See the complete [custom sidebar composition guide](https://github.com/justfrenzy22/liquid-glass/blob/main/docs/recipes/sidebar-composition.md) for skeletons above a Create Folder action and fully custom content.

## Tailwind customization

Use `className` for root utilities and `classNames` for component parts. See the [Tailwind guide](../tailwind.md) for slot names, setup commands and complete custom component examples. Utilities override default component styles; inline `style` still takes precedence.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidSidebar } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidSidebar>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
