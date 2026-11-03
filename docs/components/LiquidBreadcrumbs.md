# LiquidBreadcrumbs

Use LiquidBreadcrumbs in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidBreadcrumbs } from "@justfrenzy/liquid-glass";

export function LiquidBreadcrumbsExample() {
  return (
    <LiquidBreadcrumbs items={[{ id: "files", label: "Files" }, { id: "recent", label: "Recent" }]} onNavigate={(id) => console.log(id)} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `items` | Yes | `{ id: string; label: string; }[]` |  |
| `onNavigate` | Yes | `(id: string) => void` |  |
| `glass` | No | `GlassConfig` |  |
| `isDisabled` | No | `boolean` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidBreadcrumbs } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidBreadcrumbs>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
