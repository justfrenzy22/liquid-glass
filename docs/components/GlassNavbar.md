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
| `brand` | Yes | `ReactNode` | Brand content: text, styled JSX, an image, SVG or your own link. |
| `brandIcon` | No | `ReactNode` | Optional decorative icon placed alongside the brand content. |
| `brandHref` | No | `string` | Turn the whole brand into a link. Omit when brand already contains a link. |
| `classNames` | No | `Partial<Record<"navigation" \| "content" \| "surface" \| "brand" \| "brandIcon" \| "brandContent" \| "item" \| "actions", string>>` | Tailwind classes for individual navbar parts. |
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

## Icon, SVG and styled brand text

`brand` accepts any React content, not just a string. For an icon next to text, use `brandIcon`; the navbar handles spacing and alignment. `brandHref` turns the entire brand into one link. The icon is decorative because the visible brand supplies its accessible name.

```tsx
"use client";

import { GlassNavbar } from "@justfrenzy/liquid-glass";

export function BrandedNavbar() {
  return (
    <GlassNavbar
      brand={<span><strong>Code</strong><span style={{ fontWeight: 400 }}>Drive</span></span>}
      brandIcon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M3 7h7l2 3h9v10H3z" />
        </svg>
      }
      brandHref="/"
      items={[{ id: "files", label: "Files", href: "/files" }]}
      activeKey="files"
    />
  );
}
```

The icon defaults to 24px. Override `--lg-brand-icon-size` in your app CSS for a different size. Imported React icon components or an image with empty `alt` can also be supplied to `brandIcon`. Text and `currentColor` icons inherit your application theme.

## Image logo or icon-only brand

Pass the whole logo as `brand` when you do not want accompanying text. Give it an accessible name; do not put a meaningful icon-only logo in the decorative `brandIcon` slot.

```tsx
"use client";

import { GlassNavbar } from "@justfrenzy/liquid-glass";

export function IconOnlyNavbar() {
  return (
    <GlassNavbar
      brand={
        <svg role="img" aria-label="CodeDrive home" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M3 7h7l2 3h9v10H3z" />
        </svg>
      }
      brandHref="/"
      items={[{ id: "files", label: "Files", href: "/files" }]}
    />
  );
}
```

For an image wordmark, use `brand={<img src="/wordmark.svg" alt="CodeDrive" style={{ height: 28, width: "auto", maxWidth: "100%" }} />}` and supply your own asset. A Next.js Image component can be passed as JSX too.

## Custom links

For your own router Link component or anchor, put the complete link in `brand` and omit `brandHref` to avoid nested links. Existing `brand={<a href="/">My app</a>}` usage remains supported. Use the brand slots `data-slot="navbar-brand"`, `navbar-brand-icon` and `navbar-brand-content` for targeted application CSS.

## Tailwind customization

Use `className` for root utilities and `classNames` for component parts. See the [Tailwind guide](../tailwind.md) for slot names, setup commands and complete custom component examples. Utilities override default component styles; inline `style` still takes precedence.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassNavbar } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassNavbar>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
