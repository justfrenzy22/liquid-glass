# LiquidModal

Use LiquidModal in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { LiquidModal, LiquidButton } from "@justfrenzy/liquid-glass";

export function LiquidModalExample() {
  return (
    <LiquidModal triggerLabel="Open details" title="Project details" footer={({ close }) => <LiquidButton onPress={close}>Cancel</LiquidButton>}><p>Dialog content.</p></LiquidModal>
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
| `children` | Yes | `ReactNode \| ((controls: LiquidModalRenderProps) => ReactNode)` |  |
| `footer` | No | `ReactNode \| ((controls: LiquidModalRenderProps) => ReactNode)` | Custom actions. No footer is rendered when omitted. |
| `glass` | No | `GlassConfig` |  |
| `isDisabled` | No | `boolean` |  |
| `isOpen` | No | `boolean` | Controlled open state. Pair with onOpenChange. |
| `defaultOpen` | No | `boolean` |  |
| `onOpenChange` | No | `(isOpen: boolean) => void` |  |
| `onClose` | No | `() => void` | Called when a close is requested, including Escape, backdrop and custom actions. |
| `hideCloseButton` | No | `boolean` |  |
| `isDismissable` | No | `boolean` |  |
| `isKeyboardDismissDisabled` | No | `boolean` |  |
| `classNames` | No | `Partial<Record<"body" \| "dialog" \| "footer" \| "header" \| "title" \| "content" \| "trigger" \| "backdrop" \| "container" \| "surface" \| "closeButton", string>>` |  |


## Actions and closing

There is no default Done button or footer. Supply `footer` as JSX or `footer={({ close }) => ...}` to add your own Save/Cancel buttons. The body also accepts `children={({ close }) => ...}`. Use `close()` after a successful save; keep the modal open on failure. A footer submit button can target a form in the body through matching `form` and `id` attributes.

Use `isOpen` with `onOpenChange` for controlled state, or `defaultOpen` for the initial uncontrolled state. `onClose` notifies you when the modal requests closing (custom close, header button, Escape or backdrop); changing a controlled `isOpen` externally does not invoke it. The header close button remains unless `hideCloseButton` is set. `isDismissable={false}` prevents backdrop dismissal; `isKeyboardDismissDisabled` prevents Escape dismissal. Custom actions can still close it. `classNames` customizes the footer and other parts with Tailwind classes.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { LiquidModal } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof LiquidModal>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
