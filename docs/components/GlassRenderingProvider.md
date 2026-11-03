# GlassRenderingProvider

Use GlassRenderingProvider in a React client component. The example below uses the exported library API.

## Example

```tsx
"use client";

import { GlassRenderingProvider } from "@justfrenzy/liquid-glass";

export function GlassRenderingProviderExample() {
  return (
    <GlassRenderingProvider mode="compatible"><p>Your application controls go here.</p></GlassRenderingProvider>
  );
}
```

Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).

## Props

The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.

| Prop | Required | Type | Notes |
| --- | --- | --- | --- |
| `mode` | No | `GlassRenderMode` |  |
| `children` | Yes | `ReactNode` |  |


## Rendering modes

The provider is optional. `auto` is the default, `compatible` forces the reflective CSS finish, and `fallback` selects basic blur. This controls rendering, not application light/dark theme. Context also reaches portal overlays.

## TypeScript

```tsx
import type { ComponentProps } from "react";
import { GlassRenderingProvider } from "@justfrenzy/liquid-glass";
type Props = ComponentProps<typeof GlassRenderingProvider>;
```

Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.

[All component guides](README.md)
