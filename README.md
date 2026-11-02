# Liquid Glass

A React and TypeScript component library for reflective glass interfaces, combining a custom optical layer with native controls and styled HeroUI components.

- Desktop Chromium can refract the backdrop through SVG displacement maps.
- Safari, iPhone, iPad, Firefox and other mobile browsers use native blur, curved reflections and beveled highlights.
- Normal buttons, solid cards and alternating-row tables provide calmer alternatives.
- Controls retain keyboard operation, disabled states and reduced-motion support. Text remains on a separate, sharp layer.
- Compiled JavaScript, TypeScript declarations and CSS are included. No Next.js, Tailwind configuration, application aliases or remote visual assets are required.

**Status:** experimental release `0.1.0`. Repository: `liquid-glass`. Package/import name: `@justfrenzy22/liquid-glass`. The package is **not published to the npm registry yet**; install the GitHub release archive below.

## Install

Requires React 19 and React DOM 19, with an ESM-aware bundler such as Vite or Next.js. Development uses Node.js 22.12 or newer.

```sh
npm install https://github.com/justfrenzy22/liquid-glass/releases/download/v0.1.0/justfrenzy22-liquid-glass-0.1.0.tgz
```

For an application that does not already have React:

```sh
npm install react@19 react-dom@19
# TypeScript applications also need the React types:
npm install -D @types/react @types/react-dom
```

Import the stylesheet **once**, before application overrides:

```tsx
import "@justfrenzy22/liquid-glass/styles.css";
```

The CSS contains compiled CSS modules and a small reset scoped to library surfaces. Do not add a Tailwind build or HeroUI global theme just to use this library. HeroUI is a package dependency. React and the verified React Aria versions are shared peers, installed automatically by modern npm; this prevents multiple incompatible copies. If your app already uses newer React Aria versions, reconcile those exact peer requirements before upgrading.

## Native React controls

```tsx
"use client";

import { useState } from "react";
import { GlassButton, GlassSlider, GlassRenderingProvider } from "@justfrenzy22/liquid-glass";

export function Controls() {
  const [volume, setVolume] = useState(40);
  return (
    <GlassRenderingProvider mode="auto">
      <GlassButton onClick={() => console.log("Clicked")}>Continue</GlassButton>
      <GlassSlider label="Volume" value={volume} onValueChange={setVolume} />
    </GlassRenderingProvider>
  );
}
```

The provider is optional; the default mode is `auto`. Place glass over a picture, gradient, pattern or other visible content to see the optical effect.

## HeroUI controls

```tsx
"use client";

import { useState } from "react";
import { LiquidButton, LiquidSwitch, LiquidInput } from "@justfrenzy22/liquid-glass/heroui";

export function FormControls() {
  const [sync, setSync] = useState(true);
  const [name, setName] = useState("");
  return (
    <>
      <LiquidButton appearance="normal">Normal</LiquidButton>
      <LiquidButton appearance="glass">Clear glass</LiquidButton>
      <LiquidButton appearance="colored" glassColor="#0878ed">Blue glass</LiquidButton>
      <LiquidSwitch label="Automatic sync" isSelected={sync} onChange={setSync} />
      <LiquidInput label="Project name" value={name} onChange={setName} />
    </>
  );
}
```

HeroUI controls use `onPress`, `isDisabled` and their corresponding HeroUI value props. Native primitives use `onClick`, `disabled` and native input props. `GlassSlider` provides `onValueChange`; `LiquidSlider` uses `onChange` and `minValue`/`maxValue`.

The core entry does not import HeroUI JavaScript. The `/heroui` entry provides the extended controls. Original `LiquidNextUI*` exports are retained as compatibility aliases; new code can use the shorter `Liquid*` names.

### Next.js

Import `styles.css` in the App Router root layout. Put callbacks and interactive state in a component marked `"use client"`. Generated entry points and shared chunks retain that directive; SSR starts with readable basic glass before client detection enhances it. The compiled archive does not require `transpilePackages`.

Navbar and Sidebar use ordinary links, so no Next.js router is required. Use `onNavigate` or your application's router integration for SPA navigation.

## Rendering modes

| Mode | Behavior |
| --- | --- |
| `auto` | Supported desktop Chromium gets SVG refraction; Safari and phones/tablets get compatible reflective glass. |
| `compatible` | Forces native blur, simulated curved reflections, corner glints and a deeper beveled rim. |
| `fallback` | Basic blur and tint without the stronger reflection layers. |

Use `<GlassRenderingProvider mode="compatible">…</GlassRenderingProvider>` to set a default, including for portal overlays. Individual controls accept `glass={{ mode: "compatible" }}`; GlassSurface takes `mode` directly. An explicit per-control mode overrides the provider.

Detection checks CSS capabilities, navigator information, optional mobile client hints and likely iPadOS desktop UAs. It is a best-effort rendering hint, not guaranteed hardware identification. Responsive layout uses CSS. Safari reflections are simulated and do not bend arbitrary live background content like the Chromium shader. Nested translucent containers can reduce visible effects; real-device review is still useful.

## Included components

**Core:** GlassSurface, GlassRenderingProvider, GlassButton, GlassIconButton, GlassInput, GlassSearch, GlassSwitch, GlassSlider, GlassCard, GlassPanel, GlassToolbar, GlassNavbar, GlassFileCard, GlassFolderCard, GlassUploadButton and GlassSearchBar. Also exported: useGlassEnvironment, glassDefaults, GlassConfig and environment-selection helpers.

The following names use the `Liquid` prefix in `/heroui`:

| Group | Components |
| --- | --- |
| Essentials | Button, Slider, Switch, Input, Checkbox, Tabs, Select, Card, Modal |
| Feedback | Dropdown, Tooltip, Popover, Accordion, Alert, ToastProvider, ProgressBar, ProgressCircle |
| Identity/navigation | Avatar, AvatarGroup, Badge, Chip, ToggleButton, Navbar, Sidebar, Breadcrumbs, Pagination |
| Forms | SearchField, TextArea, NumberField, RadioGroup, CheckboxGroup, Autocomplete, DateRangePicker, Fieldset, InputGroup, InputOTP, ErrorMessage |
| Dates/data | Calendar, RangeCalendar, DateField, TimeField, DatePicker, ComboBox, ListBox, Table |
| Dialog/disclosure | AlertDialog, Drawer, Disclosure, DisclosureGroup |
| Colors | ColorArea, ColorField, ColorPicker, ColorSlider, ColorSwatch, ColorSwatchPicker |
| Helpers | ButtonGroup, CloseButton, Toolbar, Meter, Skeleton, Spinner, Surface, ScrollShadow, Separator, Kbd, Link, Typography, TagGroup |

Also exported: **SolidCard**, **FinderTable**, **LiquidForm**, **LiquidActionButton**, `toast` and `parseColor`. Label, Description, FieldError and TextField are composed inside controls rather than exposed as standalone styled wrappers. A ToggleButtonGroup is intentionally omitted; draggable tabs cover that interaction.

TypeScript declarations describe each wrapper's exact props; not every possible HeroUI composition is exposed. Table/FinderTable uses `columns: { id, label, isRowHeader? }[]`, `rows: { id, values: Record<string, ReactNode> }[]` and `aria-label`. Navbar/Sidebar uses `items: { id, label, href, icon?, count? }[]`, `activeKey` and `onNavigate`. See `playground/main.tsx` for a runnable example.

## How it was built

The library was developed iteratively with Codex assistance:

1. Separate the transparent decoration from readable content. GlassSurface owns the backdrop; real controls sit above it.
2. Implement rounded-rectangle geometry, an analytic superellipse bevel and a Snell-law approximation. Browser canvas generates small displacement/specular maps, and SVG composes the Chromium effect.
3. Add native inputs and real HeroUI controls. Custom pointer capture keeps switch/tab lenses under the pointer and commits selection on release while preserving keyboard operation.
4. Introduce normal, clear and colored finishes, plus calm cards and Finder-style tables for dense content.
5. Build the Safari/mobile CSS rendering path with reflective bands, edge lighting, automatic selection and explicit overrides.
6. Extract the implementation into this repository: remove app aliases and Next.js imports, replace utility classes with CSS modules, preserve client boundaries, and verify the built package in an independent React playground.

Kube's [Liquid Glass article](https://kube.io/blog/liquid-glass-css-svg/) informed the optical/interaction approach. This implementation was independently authored; no Kube code or assets are distributed. HeroUI supplies substantial control behavior. This is not an official Kube or HeroUI package. See [architecture](docs/architecture.md) and [third-party notices](THIRD_PARTY_NOTICES.md).

## Clone and develop

```sh
git clone https://github.com/justfrenzy22/liquid-glass.git
cd liquid-glass
npm ci
npm run build
npm run dev
```

Open `http://localhost:4173`. The playground imports the **built package and public stylesheet**, not application-local aliases. Rebuild after changing library source.

```sh
npm run check          # build, types, package tests, playground production build
npx playwright install chromium webkit
npm run test:browser   # Chromium and WebKit desktop/mobile consumer checks
npm run pack:local     # creates .artifacts/justfrenzy22-liquid-glass-0.1.0.tgz
npm run verify:package # clean install of that archive, imports, SSR and CSS checks
```

Playwright WebKit validates an engine, not the actual Safari app or iPhone GPU. Tests do not establish every accessibility requirement or contrast on every possible background.

## Install a local build in another project

```sh
# In this library:
npm ci
npm run pack:local

# In your React application's folder; adjust the path:
npm install "../liquid-glass/.artifacts/justfrenzy22-liquid-glass-0.1.0.tgz"
```

Use the same imports shown above. Archives avoid the duplicate-React and symlink issues sometimes caused by `npm link`.

## Publish another release

```sh
npm version patch --no-git-tag-version
npm run check
npm run test:browser
npm run pack:local
npm run verify:package
git add .
git commit -m "Release 0.1.1"
git tag v0.1.1
git push origin main --tags
gh release create v0.1.1 .artifacts/justfrenzy22-liquid-glass-0.1.1.tgz --title "v0.1.1" --generate-notes
```

`dist/` is ignored in Git but included in the installable archive. Dependencies and local artifacts are not committed. The GitHub release archive contains compiled code, styles and declarations, so consumers do not need to build the repository.

For npm registry publication later, first confirm ownership of the `justfrenzy22` npm scope, then run `npm login` and `npm publish --access public` after validation. **Only after npm publication** would `npm install @justfrenzy22/liquid-glass` work. GitHub hosting and npm publication are separate steps. See npm's [archive installation documentation](https://docs.npmjs.com/cli/install/).

## License

MIT for this repository's code. Dependencies retain their own licenses. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
