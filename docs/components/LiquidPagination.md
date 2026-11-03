# LiquidPagination

Use LiquidPagination in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidPagination } from "@justfrenzy/liquid-glass";

export function LiquidPaginationExample() {
  return (
    <LiquidPagination page={1} totalPages={5} onChange={(page) => console.log(page)} />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `page` | Yes | `number` |  |
| `totalPages` | Yes | `number` |  |
| `onChange` | Yes | `(page: number) => void` |  |
| `glass` | No | `GlassConfig` |  |
| `isDisabled` | No | `boolean` |  |


## Controlled page

The example demonstrates the callback shape. In a working pagination control, store `page` in React state and update it in `onChange`; passing a fixed `page={1}` keeps selection on page 1. Load or filter your actual data separately.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidPagination } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidPagination>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
