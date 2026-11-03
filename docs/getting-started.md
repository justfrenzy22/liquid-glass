# Using Liquid Glass in your application

## Install

```sh
npm install @justfrenzy/liquid-glass
```

Use React 19 and React DOM 19. Browser component imports load the library CSS automatically in version 0.1.4 and newer. You do not run a separate library server or copy component source files into your app.

## Your first button

```tsx
"use client";

import { LiquidButton } from "@justfrenzy/liquid-glass";

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

## One collection, one main import

Import main components from `@justfrenzy/liquid-glass`. `LiquidNavbar` and `GlassNavbar`, `LiquidSidebar` and `GlassSidebar`, and the matching Button, Switch, Slider, Input, Search, Card and Toolbar names now refer to the same liquid designs with the same props. Prefer `Liquid*` names for new code.

Use `onPress` and `isDisabled`. Input callbacks receive a string; switch callbacks receive a boolean. `/heroui` remains supported for existing imports. To deliberately retain the old native implementations and DOM event props, use `/native`. See the [0.2 migration guide](migration-0.2.md).

## Next.js

Keep state, event callbacks and interactive components in a file beginning with `"use client"`. Import that component into a page or layout. A component import loads styling through the package's browser entry; you do not need to add a CSS import to the root layout.

The `styles.css` export remains available for a build that needs explicit stylesheet placement or for compatibility with existing imports. Direct Node server rendering uses CSS-free entries; it does not attempt to execute CSS. The library does not install routes into your application.

## Controlled input

```tsx
"use client";

import { useState } from "react";
import { LiquidInput } from "@justfrenzy/liquid-glass";

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

import { LiquidNavbar } from "@justfrenzy/liquid-glass";

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
- Import `LiquidButton`, `LiquidNavbar`, `LiquidSidebar` and the other main components from the package root. `/heroui` is a compatibility path.
- Use `onPress` for both `LiquidButton` and its `GlassButton` alias. Only `/native` retains the previous native `onClick`/`disabled` API.
- Put native input options for `LiquidInput` inside `inputProps`.
- When passing a controlled value, update it in the corresponding callback; a fixed value makes the control appear stuck.
- Forms, upload buttons and navigation components do not create your backend, file uploads or routes.

[Browse all 91 component guides](components/README.md)
