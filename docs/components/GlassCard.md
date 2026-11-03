# GlassCard

The same component as LiquidCard, with identical props and liquid design. This name is an alias, not a simpler visual variant.

## Example

```tsx
"use client";

import { GlassCard } from "@justfrenzy/liquid-glass";

export function GlassCardExample() {
  return (
    <GlassCard title="Project" description="Project details."><p>Your content</p></GlassCard>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `title` | Yes | `string` |  |
| `description` | No | `string` |  |
| `children` | No | `ReactNode` |  |
| `footer` | No | `ReactNode` |  |
| `glass` | No | `GlassConfig` |  |
| `appearance` | No | `"glass" \| "solid"` |  |


## Shared design

See [LiquidCard](LiquidCard.md) for the main usage guide. Import either name from the package root; they render exactly the same component. Choose normal, glass or colored appearance through props where supported, not by switching prefixes. For the previous native API, explicitly import from `@justfrenzy/liquid-glass/native`.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassCard } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassCard>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
