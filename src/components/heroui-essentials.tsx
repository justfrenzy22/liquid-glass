"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Card,
  Checkbox,
  Label,
  ListBox,
  Modal,
  Select,
  Tabs,
  type CheckboxProps,
  type SelectProps,
  type TabsProps,
} from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import { LiquidNextUIButton } from "./heroui-controls.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-essentials.module.css";
import { useGlassDrag } from "./use-glass-drag.js";

export function LiquidNextUICheckbox({
  label,
  glass,
  className = "",
  ...props
}: Omit<CheckboxProps, "children"> & { label: string; glass?: GlassConfig }) {
  return (
    <Checkbox {...props} className={`${styles.checkbox} ${className}`}>
      <Checkbox.Content className={styles.checkboxContent}>
        {({ isSelected, isPressed, isFocusVisible }) => (
          <>
            <Checkbox.Control className={styles.checkControl}>
              <GlassSurface
                {...glass}
                radius={10}
                opacity={isSelected ? 0.1 : 0.35}
                blur={0}
                thickness={50}
                className={styles.checkLens}
                data-active={isPressed || isFocusVisible}
              >
                <span className={styles.checkMark} aria-hidden="true">
                  {isSelected ? "✓" : ""}
                </span>
              </GlassSurface>
            </Checkbox.Control>
            <Label>{label}</Label>
          </>
        )}
      </Checkbox.Content>
    </Checkbox>
  );
}

export type LiquidTabItem = { id: string; label: string; content: ReactNode };
export function LiquidNextUITabs({
  items,
  label,
  glass,
  isDisabled,
  className = "",
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  ...props
}: Omit<TabsProps, "children"> & {
  items: LiquidTabItem[];
  label: string;
  glass?: GlassConfig;
  isDisabled?: boolean;
}) {
  const [localKey, setLocalKey] = useState(defaultSelectedKey ?? items[0]?.id);
  const key = selectedKey ?? localKey;
  const index = Math.max(
    0,
    items.findIndex((item) => item.id === key),
  );
  const strip = useRef<HTMLDivElement>(null);
  const disabled = new Set(
    isDisabled ? items.map((item) => item.id) : props.disabledKeys,
  );
  const selectIndex = (next: number) => {
    const enabled = items
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => !disabled.has(item.id));
    enabled.sort((a, b) => Math.abs(a.i - next) - Math.abs(b.i - next));
    const nearest = enabled[0];
    if (!nearest) return;
    if (nearest.item.id !== key) {
      setLocalKey(nearest.item.id);
      onSelectionChange?.(nearest.item.id);
    }
    strip.current
      ?.querySelectorAll<HTMLElement>('[role="tab"]')
      [nearest.i]?.focus();
  };
  const drag = useGlassDrag({
    value: index,
    max: Math.max(0, items.length - 1),
    disabled: disabled.size >= items.length,
    pixelsPerUnit: (width) => (width - 12) / items.length,
    onCommit: (next) => selectIndex(Math.round(next)),
    onTap: (x, bounds) => {
      const tappedIndex = Math.max(
        0,
        Math.min(
          items.length - 1,
          Math.floor(
            (x - bounds.left - 6) / ((bounds.width - 12) / items.length),
          ),
        ),
      );
      if (!disabled.has(items[tappedIndex]?.id)) selectIndex(tappedIndex);
    },
  });
  return (
    <Tabs
      {...props}
      selectedKey={key}
      onSelectionChange={(next) => {
        setLocalKey(next);
        onSelectionChange?.(next);
      }}
      disabledKeys={
        isDisabled ? items.map((item) => item.id) : props.disabledKeys
      }
      className={`${styles.tabs} ${className}`}
    >
      <GlassSurface
        {...glass}
        opacity={0.12}
        radius={28}
        blur={0}
        thickness={50}
        className={styles.tabChrome}
      >
        <div
          className={styles.tabStrip}
          ref={strip}
          data-dragging={drag.draft !== null}
          onPointerDownCapture={drag.handlers.onPointerDown}
          onPointerMoveCapture={drag.handlers.onPointerMove}
          onPointerUpCapture={drag.handlers.onPointerUp}
          onPointerCancelCapture={drag.handlers.onPointerCancel}
          onLostPointerCapture={drag.handlers.onLostPointerCapture}
          onClickCapture={drag.handlers.onClickCapture}
          style={
            {
              "--tab-count": items.length,
              "--tab-index": drag.draft ?? index,
            } as CSSProperties
          }
        >
          <GlassSurface
            {...glass}
            opacity={drag.draft !== null ? 0.1 : 0.18}
            radius={22}
            blur={0}
            thickness={70}
            className={styles.tabLens}
            aria-hidden="true"
          />
          <Tabs.List aria-label={label} className={styles.tabList}>
            {items.map((item) => (
              <Tabs.Tab key={item.id} id={item.id} className={styles.tab}>
                {item.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </div>
      </GlassSurface>
      {items.map((item) => (
        <Tabs.Panel id={item.id} key={item.id} className={styles.tabPanel}>
          {item.content}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

export type LiquidSelectOption = { id: string; label: string };
export function LiquidNextUISelect({
  label,
  options,
  glass,
  className = "",
  ...props
}: Omit<SelectProps<LiquidSelectOption>, "children"> & {
  label: string;
  options: LiquidSelectOption[];
  glass?: GlassConfig;
}) {
  return (
    <Select {...props} className={`${styles.select} ${className}`}>
      <Label className={styles.label}>{label}</Label>
      <Select.Trigger className={styles.selectTrigger}>
        <GlassSurface
          {...glass}
          radius={26}
          opacity={0.15}
          blur={0}
          thickness={65}
          className={styles.triggerSurface}
        >
          <span className={styles.triggerContent}>
            <Select.Value>
              {({ selectedText, isPlaceholder }) =>
                isPlaceholder
                  ? (props.placeholder ?? "Choose an option")
                  : selectedText
              }
            </Select.Value>
            <span aria-hidden="true">⌄</span>
          </span>
        </GlassSurface>
      </Select.Trigger>
      <Select.Popover className={styles.popover}>
        <GlassSurface
          {...glass}
          radius={22}
          opacity={0.65}
          blur={4}
          thickness={45}
          className={styles.menuSurface}
        >
          <ListBox aria-label={label} className={styles.list}>
            {options.map((option) => (
              <ListBox.Item
                id={option.id}
                key={option.id}
                textValue={option.label}
                className={styles.listItem}
              >
                <Label>{option.label}</Label>
                <ListBox.ItemIndicator className={styles.itemIndicator} />
              </ListBox.Item>
            ))}
          </ListBox>
        </GlassSurface>
      </Select.Popover>
    </Select>
  );
}

export function LiquidNextUICard({
  title,
  description,
  children,
  footer,
  glass,
  appearance = "glass",
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  glass?: GlassConfig;
  appearance?: "glass" | "solid";
}) {
  const content = (
    <Card
      data-liquid-glass=""
      className={`${styles.card} ${appearance === "solid" ? styles.solidCard : ""}`}
      data-card-appearance={appearance}
    >
      <Card.Header>
        <Card.Title className={styles.cardTitle}>{title}</Card.Title>
        {description && (
          <Card.Description className={styles.cardDescription}>
            {description}
          </Card.Description>
        )}
      </Card.Header>
      <Card.Content className={styles.cardContent}>{children}</Card.Content>
      {footer && (
        <Card.Footer className={styles.cardFooter}>{footer}</Card.Footer>
      )}
    </Card>
  );
  if (appearance === "solid") return content;
  return (
    <GlassSurface
      {...glass}
      radius={28}
      opacity={0.22}
      blur={1}
      thickness={60}
      className={styles.cardSurface}
    >
      {content}
    </GlassSurface>
  );
}

export function NextUICard(
  props: Omit<Parameters<typeof LiquidNextUICard>[0], "appearance">,
) {
  return <LiquidNextUICard {...props} appearance="solid" />;
}

export function LiquidNextUIModal({
  triggerLabel,
  title,
  children,
  glass,
  isDisabled,
}: {
  triggerLabel: string;
  title: string;
  children: ReactNode;
  glass?: GlassConfig;
  isDisabled?: boolean;
}) {
  return (
    <Modal>
      <LiquidNextUIButton isDisabled={isDisabled} glass={glass}>
        {triggerLabel}
      </LiquidNextUIButton>
      <Modal.Backdrop className={styles.modalBackdrop}>
        <Modal.Container className={styles.modalContainer}>
          <Modal.Dialog className={styles.dialog} aria-label={title}>
            <GlassSurface
              {...glass}
              radius={32}
              opacity={0.6}
              blur={3}
              thickness={80}
            >
              <div className={styles.dialogContent}>
                <Modal.Header className={styles.dialogHeader}>
                  <Modal.Heading className={styles.dialogTitle}>
                    {title}
                  </Modal.Heading>
                  <Modal.CloseTrigger
                    aria-label="Close dialog"
                    className={styles.close}
                  >
                    ×
                  </Modal.CloseTrigger>
                </Modal.Header>
                <Modal.Body className={styles.dialogBody}>
                  {children}
                </Modal.Body>
                <Modal.Footer className={styles.dialogFooter}>
                  <Modal.CloseTrigger className={styles.done} aria-label="Done">
                    <GlassSurface
                      {...glass}
                      opacity={0.15}
                      radius={24}
                      blur={0}
                      thickness={60}
                    >
                      <span>Done</span>
                    </GlassSurface>
                  </Modal.CloseTrigger>
                </Modal.Footer>
              </div>
            </GlassSurface>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
