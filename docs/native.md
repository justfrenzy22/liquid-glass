# Optional native controls

The main package now exposes the unified liquid collection. Use this separate entry only when you want the previous native control APIs or the lower-level navbar container:

```tsx
import { GlassButton, GlassSwitch, GlassInput, GlassNavbar } from "@justfrenzy/liquid-glass/native";
```

These components are intentionally distinct from the matching names at the main package entry. Their styles load automatically, and their text inherits the application theme.

```tsx
"use client";

import { useState } from "react";
import { GlassButton, GlassSwitch, GlassInput, GlassNavbar } from "@justfrenzy/liquid-glass/native";

export function NativeControls() {
  const [name, setName] = useState("");
  return (
    <>
      <GlassNavbar><a href="/">Home</a></GlassNavbar>
      <GlassButton onClick={() => console.log("Save")}>Save</GlassButton>
      <GlassSwitch label="Automatic sync" defaultChecked />
      <GlassInput aria-label="Project name" value={name} onChange={(event) => setName(event.target.value)} />
    </>
  );
}
```

Native controls use `disabled`, ordinary input events, `checked`/`defaultChecked` for the switch, and `onValueChange` for the native slider. The native switch has a simpler circular thumb; it is not the draggable liquid switch. `GlassNavbar` here is a container for custom links, not a complete navbar with brand/items/actions.

For the intended liquid design use `LiquidNavbar`, `LiquidSidebar`, `LiquidSwitch` and `LiquidButton` from `@justfrenzy/liquid-glass`. At that main entry, the corresponding `Glass*` names are exact aliases of the enhanced designs.

[Migration details](migration-0.2.md) | [Main component guides](components/README.md)
