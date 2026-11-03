# Sidebar button that opens a New Folder modal

`LiquidSidebar` accepts React components in its `footer` prop. Its `items` prop is only navigation data; it is not a list of arbitrary components. The current sidebar does not accept custom children in the middle of its navigation list.

`LiquidModal` already renders a button using `triggerLabel`. Put the modal in `footer`, then put a form inside the modal:

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
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [folders, setFolders] = useState<
    { id: string; label: string; href: string }[]
  >([]);

  return (
    <LiquidSidebar
      heading="Workspace"
      appearance="glass"
      items={[
        { id: "files", label: "Files", href: "/files" },
        ...folders,
      ]}
      footer={
        <LiquidModal triggerLabel="New folder" title="Create a folder">
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

The modal opens when its New Folder button is pressed. Use its built-in **Done**, close button or Escape to dismiss it. The current `LiquidModal` wrapper does not expose controlled `isOpen`/`onOpenChange` props; it does not automatically close after this form submits.

## Other sidebar content

The footer can contain any React content, including a button, skeleton, multiple components in a fragment, or your own component:

```tsx
import { LiquidSkeleton } from "@justfrenzy/liquid-glass";

// Supply this as LiquidSidebar's footer while your application loads data:
const loadingFooter = <LiquidSkeleton style={{ width: 160, height: 40 }} />;
```

The sidebar hides its footer when collapsed. For a modal's trigger to remain visible, keep the sidebar expanded or place the action outside its collapsible footer.

[Sidebar reference](../components/LiquidSidebar.md) | [Modal reference](../components/LiquidModal.md)
