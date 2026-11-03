# GlassEmptyState

An empty-content panel for no files, no results or first-use screens, with optional icon and actions.

## Example

```tsx
"use client";

import { GlassEmptyState } from "@justfrenzy/liquid-glass";

export function GlassEmptyStateExample() {
  return (
    <GlassEmptyState title="No files yet" description="Upload a file to get started." />
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `style` | No | `CSSProperties` |  |
| `defaultChecked` | No | `boolean` |  |
| `defaultValue` | No | `string \| number \| readonly string[]` |  |
| `className` | No | `string` |  |
| `aria-label` | No | `string` | Defines a string value that labels the current element. |
| `onChange` | No | `ChangeEventHandler<HTMLDivElement, Element>` |  |
| `onReset` | No | `ReactEventHandler<HTMLDivElement>` |  |
| `onSubmit` | No | `SubmitEventHandler<HTMLDivElement>` |  |
| `onClick` | No | `MouseEventHandler<HTMLDivElement>` |  |
| `blur` | No | `number` | CSS pixels, clamped to 0–30. |
| `opacity` | No | `number` | White tint alpha, 0–1. |
| `radius` | No | `number` |  |
| `thickness` | No | `number` | Optical travel distance in CSS pixels, 0–120. |
| `refraction` | No | `number` | Optical strength, 0–1; zero disables displacement. |
| `specularIntensity` | No | `number` |  |
| `saturation` | No | `number` | Saturation multiplier, 0–2. |
| `displacementStrength` | No | `number` | Additional displacement multiplier, 0–2. |
| `mode` | No | `"auto" \| "compatible" \| "fallback"` | Auto selects desktop Chromium refraction or compatible CSS glass. Compatible forces the Safari/mobile finish; fallback keeps basic blur. |
| `title` | Yes | `ReactNode` |  |
| `description` | No | `ReactNode` |  |
| `icon` | No | `ReactNode` | Decorative icon; provide its meaning in the title or description. |
| `actions` | No | `ReactNode` | Supply your own buttons or links and their application behavior. |


## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassEmptyState } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassEmptyState>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
