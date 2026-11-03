# Moving from 0.1.x to 0.2.0

Version 0.2.0 gives the main package one component collection. The matching `Glass*` and `Liquid*` names now render the same liquid designs with the same props. Previously the package root exposed simpler native controls while `/heroui` exposed a different collection.

## Recommended imports

```tsx
import {
  LiquidButton,
  LiquidSwitch,
  LiquidInput,
  LiquidNavbar,
  LiquidSidebar,
} from "@justfrenzy/liquid-glass";
```

Existing `/heroui` imports continue to work and refer to the same components. The name prefix no longer chooses between two competing designs.

| Alias at the package root | Main component |
| --- | --- |
| `GlassButton` | `LiquidButton` |
| `GlassSwitch` | `LiquidSwitch` |
| `GlassSlider` | `LiquidSlider` |
| `GlassInput` | `LiquidInput` |
| `GlassSearch` | `LiquidSearchField` |
| `GlassCard` | `LiquidCard` |
| `GlassToolbar` | `LiquidToolbar` |
| `GlassNavbar` | `LiquidNavbar` |
| `GlassSidebar` | `LiquidSidebar` |

`GlassSurface`, the rendering provider and low-level primitives without an overlapping Liquid equivalent remain available. `appearance` chooses normal/glass/colored styling where that component supports those options. Do not switch prefixes to select an appearance.

## Keep the previous native API

If you need the old DOM-event props or deliberately simpler controls, change only the import path:

```tsx
import { GlassSwitch, GlassSlider, GlassNavbar } from "@justfrenzy/liquid-glass/native";
```

The [native API guide](native.md) describes that opt-in collection. Automatic styling and theme support apply there too.

## Adopting the unified API

| Previous native usage | Unified usage |
| --- | --- |
| `disabled` | `isDisabled` |
| Switch `checked` / `defaultChecked` | `isSelected` / `defaultSelected` |
| Switch `onChange(event)` | `onChange(selected: boolean)` |
| Slider `onValueChange(value)` | `onChange(value)` |
| Input `onChange(event)` | `onChange(value: string)` |
| Native input attributes | Use `inputProps` on `LiquidInput`, and supply its required `label` |
| Navbar children containing custom links | Supply `brand` and an `items` array with `id`, `label` and `href` |
| Card with only children | Supply the required card `title`, plus optional children |
| Button `onClick` | Prefer `onPress`; the underlying HeroUI compatibility event is also available |

For example, the unified switch is:

```tsx
"use client";

import { useState } from "react";
import { LiquidSwitch } from "@justfrenzy/liquid-glass";

export function SyncSetting() {
  const [enabled, setEnabled] = useState(true);
  return <LiquidSwitch label="Automatic sync" isSelected={enabled} onChange={setEnabled} />;
}
```

Do not pass children to the switch; its visible text belongs in `label`.

Start with the [Navbar](components/LiquidNavbar.md), [Sidebar](components/LiquidSidebar.md), [Button](components/LiquidButton.md) or [all component guides](components/README.md).
