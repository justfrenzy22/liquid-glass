# Tailwind CSS and custom components

Version 0.3.0 uses Tailwind CSS 4 to author component layout, spacing, sizing and typography. Custom CSS still handles glass refraction, reflections, gradients and drag animations. Tailwind compiles to CSS too; it makes those shared layout rules easier to extend without replacing the optical rendering.

## Install and check

```sh
npm install @justfrenzy/liquid-glass
npm ls tailwindcss
```

Tailwind CSS `^4.0.0` is a required peer dependency. Modern npm installs missing peers and reports incompatible versions. This is an installation check, not browser detection. React 19 and React DOM 19 remain required.

Component imports still load precompiled library styles automatically. You do not need to scan the library source or run its build. Installing Tailwind alone does not configure your application's CSS compiler: to use your own utility classes, follow the [Tailwind installation guide](https://tailwindcss.com/docs/installation/framework-guides) for your framework.

For Next.js with Tailwind 4, install the compiler if it is missing:

```sh
npm install -D tailwindcss@^4 @tailwindcss/postcss@^4 postcss
```

Use this in `postcss.config.mjs`:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

In your application's global stylesheet, imported by the root layout:

```css
@import "tailwindcss";
/* Optional: expose the library's theme colors as Tailwind utilities. */
@import "@justfrenzy/liquid-glass/tailwind.css";
```

The optional integration adds `bg-glass-panel`, `text-glass-muted`, `text-glass-accent` and `rounded-glass`. They follow the library's light/dark theme tokens. It does not replace the automatic component styles. `tokens.css` is also exported for apps that need just the CSS variables.

## Customize the button

`className` styles the root. `classNames` targets the button's `root`, `surface` and `content` separately:

```tsx
"use client";

import { LiquidButton } from "@justfrenzy/liquid-glass";

export function WideButton() {
  return (
    <LiquidButton
      appearance="colored"
      className="w-full font-bold"
      classNames={{ content: "px-8 py-4" }}
    >
      Create folder
    </LiquidButton>
  );
}
```

## Customize navigation parts

Sidebar slots: `surface`, `container`, `headingRow`, `heading`, `collapseButton`, `header`, `actions`, `body`, `navigation`, `item`, `content`, `footer`.

Navbar slots: `surface`, `content`, `brand`, `brandIcon`, `brandContent`, `navigation`, `item`, `actions`.

```tsx
"use client";

import { LiquidSidebar, LiquidSkeleton, LiquidButton } from "@justfrenzy/liquid-glass";

export function CustomSidebar() {
  return (
    <LiquidSidebar
      className="h-dvh w-[260px] max-sm:w-full"
      classNames={{ header: "gap-5", actions: "p-2", footer: "text-sm" }}
      header={<LiquidSkeleton className="h-9 w-32" />}
      actions={<LiquidButton className="w-full">Create folder</LiquidButton>}
      items={[{ id: "files", label: "Files", href: "/files" }]}
      footer={<span>Your workspace</span>}
    />
  );
}
```

## Create your own component

The exported `cn()` helper combines conditional classes and resolves conflicting Tailwind utilities, so a caller can replace a default such as `px-6` with `px-10`.

```tsx
"use client";

import type { ComponentProps } from "react";
import { LiquidButton, cn } from "@justfrenzy/liquid-glass";

type FolderButtonProps = Omit<ComponentProps<typeof LiquidButton>, "className"> & {
  className?: string;
};

export function FolderButton({ className, ...props }: FolderButtonProps) {
  return (
    <LiquidButton
      appearance="colored"
      {...props}
      className={cn("w-full font-semibold", className)}
    />
  );
}
```

This wrapper accepts the same children, `onPress`, disabled state and glass configuration as `LiquidButton`. For a new surface, wrap your own markup with `GlassSurface` and keep accessible semantics and keyboard interactions appropriate to the control.

## How overrides work

The library places defaults in CSS cascade layers; application Tailwind utilities override component defaults. Internal Tailwind theme variables use a `liquid` prefix to avoid changing your application's Tailwind tokens. The package does not ship Tailwind Preflight. Inline `style` values take precedence over ordinary classes: use `className="w-[260px]"` instead of an inline width when you want utility overrides.

Only Button, Navbar and Sidebar currently expose the `classNames` maps above. Other components retain their documented `className`, props and `data-slot` hooks. The matching `Glass*` aliases accept the same maps as their `Liquid*` counterparts.

Keep utility names complete in source (`isActive ? "bg-blue-600" : "bg-gray-600"`) instead of constructing names such as `bg-${color}-600`. Tailwind scans your own source; no `@source` entry for this library is needed because its CSS is already compiled. See [Tailwind source detection](https://tailwindcss.com/docs/detecting-classes-in-source-files) and [directives](https://tailwindcss.com/docs/functions-and-directives).

[Component guides](components/README.md) | [Getting started](getting-started.md)
