# GlassSidebar

The same component as LiquidSidebar, with identical props and liquid design. This name is an alias, not a simpler visual variant.

## Example

```tsx
"use client";

import { GlassSidebar } from "@justfrenzy/liquid-glass";

export function GlassSidebarExample() {
  return (
    <GlassSidebar heading="Workspace" items={[{ id: "files", label: "Files", href: "/files" }, { id: "recent", label: "Recent", href: "/recent" }]} activeKey="files" onNavigate={(id) => console.log(id)} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `items` | Yes | `LiquidNavigationItem[]` |  |
| `activeKey` | No | `string` |  |
| `onNavigate` | No | `(key: string) => void` |  |
| `appearance` | No | `LiquidNavigationAppearance` |  |
| `glass` | No | `GlassConfig` |  |
| `className` | No | `string` |  |
| `label` | No | `string` |  |
| `heading` | No | `string` |  |
| `footer` | No | `ReactNode` |  |
| `isCollapsed` | No | `boolean` |  |
| `onCollapsedChange` | No | `(collapsed: boolean) => void` |  |


## Shared design

See [LiquidSidebar](LiquidSidebar.md) for the main usage guide. Import either name from the package root; they render exactly the same component. Choose normal, glass or colored appearance through props where supported, not by switching prefixes. For the previous native API, explicitly import from `@justfrenzy/liquid-glass/native`.

## Collapse and routing

For an interactive collapse control, keep `isCollapsed` in `useState` and pass its setter as `onCollapsedChange`. Items use ordinary links: `onNavigate` reports an ID but does not cancel navigation. Match `activeKey` to the current route. `appearance` accepts `"normal"`, `"glass"`, or `"colored"`.

## Controlled collapse example

```tsx
"use client";

import { useState } from "react";
import { GlassSidebar } from "@justfrenzy/liquid-glass";

export function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <GlassSidebar
      heading="Workspace"
      items={[{ id: "files", label: "Files", href: "/files" }]}
      activeKey="files"
      isCollapsed={collapsed}
      onCollapsedChange={setCollapsed}
      footer={<span>Your workspace</span>}
    />
  );
}
```

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassSidebar } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassSidebar>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
