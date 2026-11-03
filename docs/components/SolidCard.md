# SolidCard

Use SolidCard in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { SolidCard } from "@justfrenzy/liquid-glass/heroui";

export function SolidCardExample() {
  return (
    <SolidCard title="Project" description="A calm, solid card."><p>Your content</p></SolidCard>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `footer` | No | `ReactNode` |  |
| `title` | Yes | `string` |  |
| `children` | No | `ReactNode` |  |
| `description` | No | `string` |  |
| `glass` | No | `GlassConfig` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { SolidCard } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof SolidCard>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
