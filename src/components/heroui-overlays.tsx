"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import {
  AlertDialog,
  Drawer,
  Disclosure,
  DisclosureGroup,
} from "@heroui/react";
import type { GlassConfig } from "../lib/types.js";
import { LiquidNextUIButton } from "./heroui-controls.js";
import {
  LiquidNextUISurface,
  LiquidNextUICloseButton,
} from "./heroui-utilities.js";
import styles from "./heroui-additions.module.css";

type OverlayExtras = {
  triggerLabel: string;
  title: string;
  children: ReactNode;
  glass?: GlassConfig;
  isDisabled?: boolean;
};
export function LiquidNextUIAlertDialog({
  triggerLabel,
  title,
  children,
  glass,
  isDisabled,
  confirmLabel = "Confirm",
  onConfirm,
}: OverlayExtras & { confirmLabel?: string; onConfirm?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog isOpen={open} onOpenChange={setOpen}>
      <LiquidNextUIButton glass={glass} isDisabled={isDisabled}>
        {triggerLabel}
      </LiquidNextUIButton>
      <AlertDialog.Backdrop
        className={styles.backdrop}
        isKeyboardDismissDisabled={false}
      >
        <AlertDialog.Container className={styles.overlayContainer}>
          <AlertDialog.Dialog className={styles.overlayDialog}>
            <LiquidNextUISurface glass={glass}>
              <div className={styles.overlayBody}>
                <AlertDialog.Heading className={styles.overlayHeader}>
                  {title}
                </AlertDialog.Heading>
                <AlertDialog.Body>{children}</AlertDialog.Body>
                <AlertDialog.Footer className={styles.actions}>
                  <LiquidNextUIButton
                    appearance="normal"
                    autoFocus
                    onPress={() => setOpen(false)}
                  >
                    Cancel
                  </LiquidNextUIButton>
                  <LiquidNextUIButton
                    appearance="colored"
                    onPress={() => {
                      onConfirm?.();
                      setOpen(false);
                    }}
                  >
                    {confirmLabel}
                  </LiquidNextUIButton>
                </AlertDialog.Footer>
              </div>
            </LiquidNextUISurface>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
export function LiquidNextUIDrawer({
  triggerLabel,
  title,
  children,
  glass,
  isDisabled,
}: OverlayExtras) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer isOpen={open} onOpenChange={setOpen}>
      <LiquidNextUIButton glass={glass} isDisabled={isDisabled}>
        {triggerLabel}
      </LiquidNextUIButton>
      <Drawer.Backdrop className={styles.backdrop}>
        <Drawer.Content placement="right" className={styles.drawer}>
          <Drawer.Dialog className={styles.overlayDialog}>
            <LiquidNextUISurface glass={glass}>
              <div className={styles.overlayBody}>
                <Drawer.Header className={styles.overlayHeader}>
                  <Drawer.Heading>{title}</Drawer.Heading>
                  <LiquidNextUICloseButton
                    aria-label="Close drawer"
                    onPress={() => setOpen(false)}
                    glass={glass}
                  />
                </Drawer.Header>
                <Drawer.Body>{children}</Drawer.Body>
                <Drawer.Footer>
                  <LiquidNextUIButton
                    appearance="colored"
                    onPress={() => setOpen(false)}
                  >
                    Done
                  </LiquidNextUIButton>
                </Drawer.Footer>
              </div>
            </LiquidNextUISurface>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
export function LiquidNextUIDisclosure({
  title,
  children,
  glass,
  ...props
}: Omit<ComponentProps<typeof Disclosure>, "children" | "className"> & {
  title: string;
  children: ReactNode;
  glass?: GlassConfig;
}) {
  return (
    <Disclosure {...props} className={styles.disclosure}>
      <LiquidNextUISurface glass={glass}>
        <Disclosure.Heading>
          <Disclosure.Trigger className={styles.disclosureTrigger}>
            {title}
            <Disclosure.Indicator />
          </Disclosure.Trigger>
        </Disclosure.Heading>
        <Disclosure.Content>
          <div className={styles.disclosureText}>{children}</div>
        </Disclosure.Content>
      </LiquidNextUISurface>
    </Disclosure>
  );
}
export function LiquidNextUIDisclosureGroup({
  items,
  glass,
  ...props
}: Omit<ComponentProps<typeof DisclosureGroup>, "children" | "className"> & {
  items: { id: string; title: string; content: ReactNode }[];
  glass?: GlassConfig;
}) {
  return (
    <DisclosureGroup {...props} className={styles.disclosureGroup}>
      {items.map((item) => (
        <LiquidNextUIDisclosure
          id={item.id}
          key={item.id}
          title={item.title}
          glass={glass}
        >
          {item.content}
        </LiquidNextUIDisclosure>
      ))}
    </DisclosureGroup>
  );
}
