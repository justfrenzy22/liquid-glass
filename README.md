# Liquid Glass

[![CI](https://github.com/justfrenzy22/liquid-glass/actions/workflows/ci.yml/badge.svg)](https://github.com/justfrenzy22/liquid-glass/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/justfrenzy22/liquid-glass?label=release)](https://github.com/justfrenzy22/liquid-glass/releases)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A React and TypeScript component library for reflective glass interfaces, combining a custom optical layer with native controls and styled HeroUI components.

![Liquid Glass React components: normal, clear and blue buttons, refractive slider, switch, search field and draggable tabs](https://raw.githubusercontent.com/justfrenzy22/liquid-glass/main/docs/media/preview-desktop.png)

**[Install](#install) Â· [Components](#included-components) Â· [See it move](#see-it-move) Â· [Try locally](#clone-and-develop)**

Curious about the optics, Safari treatment and design tradeoffs? Read the [research notes](https://github.com/justfrenzy22/liquid-glass/blob/main/docs/RESEARCH.md) for sources, implementation decisions, reproducible checks and open questions.

- Desktop Chromium can refract the backdrop through SVG displacement maps.
- Safari, iPhone, iPad, Firefox and other mobile browsers use native blur, curved reflections and beveled highlights.
- Normal buttons, solid cards and alternating-row tables provide calmer alternatives.
- Controls retain keyboard operation, disabled states and reduced-motion support. Text remains on a separate, sharp layer.
- Compiled JavaScript, TypeScript declarations and CSS are included. No Next.js, Tailwind configuration, application aliases or remote visual assets are required.

**Release:** `0.1.1`. Repository: `liquid-glass`. Package/import name: `@justfrenzy/liquid-glass`.

## Install

Requires React 19 and React DOM 19, with an ESM-aware bundler such as Vite or Next.js.

```sh
npm install @justfrenzy/liquid-glass
```

For an application that does not already have React:

```sh
npm install react@19 react-dom@19
# TypeScript applications also need the React types:
npm install -D @types/react @types/react-dom
```

Import the stylesheet **once**, before application overrides:

```tsx
import "@justfrenzy/liquid-glass/styles.css";
```

The CSS contains compiled CSS modules and a small reset scoped to library surfaces. Do not add a Tailwind build or HeroUI global theme just to use this library. HeroUI is a package dependency. React and the verified React Aria versions are shared peers, installed automatically by modern npm; this prevents multiple incompatible copies. If your app already uses newer React Aria versions, reconcile those exact peer requirements before upgrading.

## Native React controls

```tsx
"use client";

import { useState } from "react";
import { GlassButton, GlassSlider, GlassRenderingProvider } from "@justfrenzy/liquid-glass";

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
import { LiquidButton, LiquidSwitch, LiquidInput } from "@justfrenzy/liquid-glass/heroui";

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

## See it move

![An actual slider drag: the glass thumb expands, moves along the track and refracts the striped background](https://raw.githubusercontent.com/justfrenzy22/liquid-glass/main/docs/media/slider-motion.gif)

Recorded from the library components in Chromium. Pressing expands the thumb; dragging refracts the stripes behind it. These are real component captures, not concept renders.

<details>
<summary><strong>Safari-compatible finish and mobile layout</strong></summary>

The compatible renderer uses simulated reflections and native blur. These captures use Playwright WebKit, including an iPhone-emulated viewport; they are not photographs of physical Apple devices.

**Compatible glass â€” WebKit desktop**

![WebKit-compatible glass with curved highlights on buttons, slider, search field and tabs](https://raw.githubusercontent.com/justfrenzy22/liquid-glass/main/docs/media/preview-safari.png)

**Mobile layout â€” iPhone emulation**

<img src="https://raw.githubusercontent.com/justfrenzy22/liquid-glass/main/docs/media/preview-mobile.png" alt="The same actual components in the mobile layout, using compatible reflective glass" width="320" />

</details>

## Rendering modes

| Mode | Behavior |
| --- | --- |
| `auto` | Supported desktop Chromium gets SVG refraction; Safari and phones/tablets get compatible reflective glass. |
| `compatible` | Forces native blur, simulated curved reflections, corner glints and a deeper beveled rim. |
| `fallback` | Basic blur and tint without the stronger reflection layers. |

Use `<GlassRenderingProvider mode="compatible">â€¦</GlassRenderingProvider>` to set a default, including for portal overlays. Individual controls accept `glass={{ mode: "compatible" }}`; GlassSurface takes `mode` directly. An explicit per-control mode overrides the provider.

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

TypeScript declarations describe each wrapper's exact props; not every possible HeroUI composition is exposed. Table/FinderTable uses `columns: { id, label, isRowHeader? }[]`, `rows: { id, values: Record<string, ReactNode> }[]` and `aria-label`. Navbar/Sidebar uses `items: { id, label, href, icon?, count? }[]`, `activeKey` and `onNavigate`. See the usage examples above for direct imports.

## How it was built

The library was developed iteratively with Codex assistance:

1. Separate the transparent decoration from readable content. GlassSurface owns the backdrop; real controls sit above it.
2. Implement rounded-rectangle geometry, an analytic superellipse bevel and a Snell-law approximation. Browser canvas generates small displacement/specular maps, and SVG composes the Chromium effect.
3. Add native inputs and real HeroUI controls. Custom pointer capture keeps switch/tab lenses under the pointer and commits selection on release while preserving keyboard operation.
4. Introduce normal, clear and colored finishes, plus calm cards and Finder-style tables for dense content.
5. Build the Safari/mobile CSS rendering path with reflective bands, edge lighting, automatic selection and explicit overrides.
6. Extract the implementation into this repository: remove app aliases and Next.js imports, replace utility classes with CSS modules, preserve client boundaries, and verify the built package in an independent React consumer.

Kube's [Liquid Glass article](https://kube.io/blog/liquid-glass-css-svg/) informed the optical/interaction approach. This implementation was independently authored; no Kube code or assets are distributed. HeroUI supplies substantial control behavior. This is not an official Kube or HeroUI package. See [architecture](https://github.com/justfrenzy22/liquid-glass/blob/main/docs/architecture.md) and [third-party notices](THIRD_PARTY_NOTICES.md).

## Package contents

Install the package into your existing React application and use the imports above. No library development server, demo application, source build or Python setup is required.

The release archive contains compiled ESM, TypeScript declarations, CSS, this README, the changelog and license notices. It excludes test fixtures, demo pages, development scripts, development dependency metadata and research media. React 19 is supplied by your application; npm installs the library's runtime dependencies and required peers.

This is an early `0.1.x` library. Browser differences and the rendering limitations described above still apply; publishing a consumer package is not a claim that all components have completed usability or accessibility audits.

For source contributions and release checks, see [CONTRIBUTING.md](https://github.com/justfrenzy22/liquid-glass/blob/main/CONTRIBUTING.md). For changes in this release, see [CHANGELOG.md](CHANGELOG.md).

## License

MIT for this repository's code. Dependencies retain their own licenses. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
