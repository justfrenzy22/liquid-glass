# LiquidChip

Use LiquidChip in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidChip } from "@justfrenzy/liquid-glass/heroui";

export function LiquidChipExample() {
  return (
    <LiquidChip>Shared</LiquidChip>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `glass` | No | `GlassConfig` |  |
| `children` | Yes | `ReactNode` |  |
| `tone` | No | `"success" \| "warning" \| "neutral"` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidChip } from "@justfrenzy/liquid-glass/heroui";
type Props = ComponentProps<typeof LiquidChip>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
