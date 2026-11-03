# Sidebar button that opens a New Folder modal

`LiquidSidebar` accepts React components in `header`, `actions`, `children` and `footer`. Its optional `items` prop is navigation data. Put the New Folder modal in `actions` to position its trigger above navigation, or in `footer` for a bottom action. See [custom sidebar composition](sidebar-composition.md) for skeletons above the button and custom body content.

`LiquidModal` already renders a button using `triggerLabel`. Put the modal in `actions`, then put a form inside the modal:

```tsx
"use client";

import { useState } from "react";
import {
  LiquidSidebar,
  LiquidModal,
  LiquidForm,
  LiquidInput,
  LiquidButton,
} from "@justfrenzy/liquid-glass";

export function SidebarWithFolderDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [folders, setFolders] = useState<
    { id: string; label: string; href: string }[]
  >([]);

  return (
    <LiquidSidebar
      appearance="glass"
      items={[
        { id: "files", label: "Files", href: "/files" },
        ...folders,
      ]}
      actions={
        <LiquidModal triggerLabel="New folder" title="Create a folder" isOpen={isOpen} onOpenChange={setIsOpen}>
          <LiquidForm
            onSubmit={(event) => {
              event.preventDefault();
              const folderName = name.trim();
              if (!folderName) return;
              const id = crypto.randomUUID();
              setFolders((current) => [
                ...current,
                { id, label: folderName, href: `#folder-${id}` },
              ]);
              setName("");
              setIsOpen(false);
              setMessage(`Created folder "${folderName}".`);
            }}
          >
            <div style={{ display: "grid", gap: 16 }}>
              <LiquidInput
                label="Folder name"
                name="folderName"
                value={name}
                onChange={(value) => {
                  setName(value);
                  setMessage("");
                }}
                isRequired
                inputProps={{ placeholder: "Name your folder" }}
              />
              <LiquidButton
                type="submit"
                appearance="colored"
                isDisabled={!name.trim()}
              >
                Create folder
              </LiquidButton>
              {message && <p role="status">{message}</p>}
            </div>
          </LiquidForm>
        </LiquidModal>
      }
    />
  );
}
```

This example adds a sidebar item to local React state. It does not persist a folder or call a backend. Replace the state-only creation with your own API request when integrating storage; only add the item after that request succeeds. The sample hash links are placeholders for your application's folder navigation.

The modal closes after this local save succeeds. Control `isOpen` with `onOpenChange` to close it after your own async request. There is no default Done button; add custom actions with `footer={({ close }) => ...}`. See the [Modal reference](../components/LiquidModal.md) for closing and dismissal options.

## Other sidebar content

The header, actions, body and footer can contain React components. For example, put a skeleton in `header` to place it above the New Folder action:

```tsx
import { LiquidSkeleton } from "@justfrenzy/liquid-glass";

// Supply this as LiquidSidebar's header while your application loads data:
const loadingHeader = <LiquidSkeleton style={{ width: 160, height: 40 }} />;
```

The sidebar hides header, actions, custom body children and footer when collapsed. For a modal's trigger to remain visible, keep the sidebar expanded or place that action outside the collapsible sidebar.

[Sidebar reference](../components/LiquidSidebar.md) | [Modal reference](../components/LiquidModal.md)
