# Compose your sidebar

In version 0.2.3 and newer, the sidebar is a layout container with optional slots. You can put skeletons at the top, a New Folder button underneath, navigation links next, and other components in the body or footer.

| Prop | Placement |
| --- | --- |
| `heading` | Optional title row. There is no title by default. |
| `header` | Top content, such as a logo, account control, search field or skeleton. |
| `actions` | Buttons or modal triggers below the header and above navigation. |
| `items` | Optional navigation links. Omit for fully custom content. |
| `children` | Custom body content below any navigation links. |
| `footer` | Bottom content, outside the scrollable body. |
| `style` / `className` | Root layout and styling. |

## Skeleton above the Create Folder action

```tsx
"use client";

import {
  LiquidSidebar,
  LiquidSkeleton,
  LiquidModal,
  LiquidInput,
} from "@justfrenzy/liquid-glass";

export function CustomSidebar() {
  return (
    <LiquidSidebar
      appearance="normal"
      style={{ width: 260, height: "100dvh" }}
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LiquidSkeleton style={{ width: 36, height: 36, borderRadius: 12 }} />
          <LiquidSkeleton style={{ width: 96, height: 10 }} />
        </div>
      }
      actions={
        <LiquidModal triggerLabel="+ Create Folder" title="Create a folder">
          <LiquidInput label="Folder name" inputProps={{ placeholder: "Name your folder" }} />
        </LiquidModal>
      }
      items={[
        { id: "files", label: "Files", href: "/files" },
        { id: "recent", label: "Recent", href: "/recent" },
      ]}
      footer={<p>Storage: 2 GB of 10 GB used</p>}
    >
      <section aria-label="Shared folders loading">
        <LiquidSkeleton style={{ width: "100%", height: 16 }} />
      </section>
    </LiquidSidebar>
  );
}
```

This example demonstrates placement and opens a modal; it does not create or persist a folder. For a form with local folder creation, use the [New Folder recipe](sidebar-new-folder.md). In an application with a reusable create-folder component, put it directly in `actions`, for example `actions={<CreateFolderAction onCreate={createFolder} />}`.

Skeletons render wherever you place them. Your application decides when to show loading placeholders or replace them with real data.

## Fully custom body

Omit `items` and put your own sections, loading rows, buttons, links or cards inside the sidebar:

```tsx
"use client";

import { LiquidSidebar, LiquidSkeleton, LiquidButton } from "@justfrenzy/liquid-glass";

export function LoadingSidebar() {
  return (
    <LiquidSidebar
      label="Workspace sidebar"
      header={<LiquidSkeleton style={{ width: 120, height: 24 }} />}
      actions={<LiquidButton onPress={() => console.log("Create folder")}>Create Folder</LiquidButton>}
    >
      <div style={{ display: "grid", gap: 12 }}>
        <LiquidSkeleton style={{ width: "100%", height: 20 }} />
        <LiquidSkeleton style={{ width: "80%", height: 20 }} />
        <LiquidSkeleton style={{ width: "90%", height: 20 }} />
      </div>
    </LiquidSidebar>
  );
}
```

Custom links should have accessible labels. If you want a navigation landmark around custom links, supply your own `<nav aria-label="...">` inside the body. `label` names the sidebar for screen readers; it does not add visible text.

## Sizing and scrolling

The default desktop width is 220px with a 380px minimum height. On narrow screens the default width is 100% and the minimum height is removed. Set inline `style={{ width: 260, height: "100dvh" }}` for a fixed viewport-height sidebar; an inline width overrides the responsive default. Use `minHeight: 0` if you deliberately need a shorter desktop sidebar.

With a bounded height, the body containing `items` and `children` scrolls. Header, actions and footer remain outside that scrolling body. Application CSS can target `data-slot="sidebar-top"`, `sidebar-actions`, `sidebar-body`, `sidebar-content` and `sidebar-footer` if needed.

## Collapsed state

When collapsed, custom header, actions, body children and footer are not rendered. Navigation item icons and the optional collapse button remain. Keep state outside those slots if it must survive collapse. The default still has no heading; pass `heading` explicitly to add one.

[Sidebar reference](../components/LiquidSidebar.md)
