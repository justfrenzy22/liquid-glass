# Using Liquid Glass in your application

## Install

```sh
npm install @justfrenzy/liquid-glass
```

Use React 19 and React DOM 19. Browser component imports load the library CSS automatically in version 0.1.4 and newer. You do not run a separate library server or copy component source files into your app.

## Your first button

```tsx
"use client";

import { LiquidButton } from "@justfrenzy/liquid-glass/heroui";

export function SaveButton() {
  return (
    <LiquidButton
      appearance="colored"
      glassColor="#0878ed"
      onPress={() => console.log("Save clicked")}
    >
      Save changes
    </LiquidButton>
  );
}
```

Replace the logging with your own action. `appearance="normal"` gives a calm button, `"glass"` a clear glass button and `"colored"` a tinted glass button. See [LiquidButton](components/LiquidButton.md).

## Core or HeroUI?

| Import | Intended use | Activation / state |
| --- | --- | --- |
| `@justfrenzy/liquid-glass` | Native controls and glass layout primitives | `onClick`, `disabled`, native input events; `GlassSlider` uses `onValueChange` |
| `@justfrenzy/liquid-glass/heroui` | Extended controls backed by HeroUI | `onPress`, `isDisabled`, component-specific value callbacks |

Do not assume callbacks take the same argument: `LiquidInput.onChange` receives a string, while `GlassInput.onChange` receives a native React input event. You can import from both entries in one application.

## Next.js

Keep state, event callbacks and interactive components in a file beginning with `"use client"`. Import that component into a page or layout. A component import loads styling through the package's browser entry; you do not need to add a CSS import to the root layout.

The `styles.css` export remains available for a build that needs explicit stylesheet placement or for compatibility with existing imports. Direct Node server rendering uses CSS-free entries; it does not attempt to execute CSS. The library does not install routes into your application.

## Controlled input

```tsx
"use client";

import { useState } from "react";
import { LiquidInput } from "@justfrenzy/liquid-glass/heroui";

export function ProjectName() {
  const [name, setName] = useState("");
  return (
    <LiquidInput
      label="Project name"
      value={name}
      onChange={setName}
      inputProps={{ placeholder: "Name your project" }}
    />
  );
}
```

## Navbar

```tsx
"use client";

import { LiquidNavbar } from "@justfrenzy/liquid-glass/heroui";

export function Navigation() {
  return (
    <LiquidNavbar
      brand={<a href="/">My app</a>}
      items={[
        { id: "files", label: "Files", href: "/files" },
        { id: "shared", label: "Shared", href: "/shared" },
      ]}
      activeKey="files"
      appearance="glass"
    />
  );
}
```

These are real links. Create the `/files` and `/shared` routes yourself. Derive `activeKey` from the current route; the static example highlights Files. `onNavigate` reports the clicked ID and does not cancel the link's default navigation. See [LiquidNavbar](components/LiquidNavbar.md) and [LiquidSidebar](components/LiquidSidebar.md).

## Themes

Text inherits your application's color. The library does not set the body foreground or background. Neutral fills follow the system preference unless an ancestor has `.dark`, `.light`, `data-theme="dark|light"` or `data-liquid-theme="dark|light"`. Put the marker on `html` or `body` so portal overlays share it.

For example, your application can use `data-theme="dark"` on `html` and set a light body text color against a dark background. You can override `--lg-foreground`, `--lg-muted`, `--lg-solid-background`, `--lg-glass-rgb` and `--lg-on-accent` in your own CSS. Leave `--lg-foreground` unset to inherit text. Colored buttons default to white text; choose an appropriate `--lg-on-accent` for a very light custom tint.

The library cannot infer every arbitrary palette or guarantee contrast on every image. Review the text and background combination in your app.

## Glass rendering

Glass needs visible content behind it to show refraction or blur. Over a flat background, its visual effect is subtler. A patterned background is useful for checking it.

Supported desktop Chromium uses the refraction renderer. Safari and mobile use simulated reflections and native blur; they do not distort the live backdrop in the same way. `glass={{ mode: "compatible" }}` forces the compatible material on controls; `GlassSurface` takes `mode="compatible"` directly. The optional `GlassRenderingProvider` sets a shared rendering mode.

## Common mistakes

- Import the actual React component and render it as `<LiquidButton>Save</LiquidButton>`; installing the package alone does not insert UI into your page.
- For version 0.1.3 or earlier, explicitly import `@justfrenzy/liquid-glass/styles.css`. Version 0.1.4 adds automatic styles.
- Use `/heroui` for `LiquidButton`, `LiquidNavbar` and the other extended components. Core `Glass*` components come from the package root.
- Use `onPress` for `LiquidButton`, and `onClick` for `GlassButton`.
- Put native input options for `LiquidInput` inside `inputProps`.
- When passing a controlled value, update it in the corresponding callback; a fixed value makes the control appear stuck.
- Forms, upload buttons and navigation components do not create your backend, file uploads or routes.

[Browse all 90 component guides](components/README.md)
