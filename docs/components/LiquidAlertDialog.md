# LiquidAlertDialog

Use LiquidAlertDialog in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidAlertDialog } from "@justfrenzy/liquid-glass";

export function LiquidAlertDialogExample() {
  return (
    <LiquidAlertDialog triggerLabel="Delete file" title="Delete this file?"><p>Review this action before confirming.</p></LiquidAlertDialog>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `triggerLabel` | Yes | `string` |  |
| `title` | Yes | `string` |  |
| `children` | Yes | `ReactNode` |  |
| `glass` | No | `GlassConfig` |  |
| `isDisabled` | No | `boolean` |  |
| `confirmLabel` | No | `string` |  |
| `onConfirm` | No | `() => void` |  |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidAlertDialog } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidAlertDialog>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
