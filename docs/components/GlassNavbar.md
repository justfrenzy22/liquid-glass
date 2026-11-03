# GlassNavbar

The same component as LiquidNavbar, with identical props and liquid design. This name is an alias, not a simpler visual variant.

## Example

```tsx
"use client";

import { GlassNavbar } from "@justfrenzy/liquid-glass";

export function GlassNavbarExample() {
  return (
    <GlassNavbar brand="My app" items={[{ id: "files", label: "Files", href: "/files" }, { id: "recent", label: "Recent", href: "/recent" }]} activeKey="files" onNavigate={(id) => console.log(id)} />
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
| `brand` | Yes | `ReactNode` |  |
| `actions` | No | `ReactNode` |  |


## Shared design

See [LiquidNavbar](LiquidNavbar.md) for the main usage guide. Import either name from the package root; they render exactly the same component. Choose normal, glass or colored appearance through props where supported, not by switching prefixes. For the previous native API, explicitly import from `@justfrenzy/liquid-glass/native`.

## Navigation behavior

Each item needs a stable `id`, visible `label` and real `href`. `activeKey` should match the current page, usually derived from your router. `onNavigate` receives the clicked item ID; it does not prevent the anchor from following `href`. You do not need local state merely to follow links. For Next.js, derive `activeKey` from `usePathname()` in a client component.

`brand` and `actions` accept React content. `appearance` accepts `"normal"`, `"glass"` (default), or `"colored"`. `glass={{ mode: "compatible" }}` forces the compatible material. Icons are optional React nodes on items; `count` is an optional number. The navbar does not implement your routes or a mobile navigation menu.

```tsx
"use client";

import { GlassNavbar, LiquidButton } from "@justfrenzy/liquid-glass/heroui";

export function Navigation() {
  return (
    <GlassNavbar
      brand={<a href="/">My app</a>}
      items={[
        { id: "files", label: "Files", href: "/files" },
        { id: "shared", label: "Shared", href: "/shared", count: 3 },
      ]}
      activeKey="files"
      appearance="glass"
      actions={<LiquidButton onPress={() => console.log("Upload")}>Upload</LiquidButton>}
    />
  );
}
```

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassNavbar } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassNavbar>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
