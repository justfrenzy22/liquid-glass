"use client";

import type { ReactNode } from "react";
import {
  Accordion,
  Alert,
  Dropdown,
  Label,
  Popover,
  ProgressBar,
  ProgressCircle,
  Toast,
  Tooltip,
  type AccordionProps,
  type ProgressBarProps,
  type ProgressCircleProps,
  type ToastProviderProps,
} from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import { LiquidNextUIButton } from "./heroui-controls.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-feedback.module.css";

type GlassProps = { glass?: GlassConfig };
export type LiquidMenuAction = {
  id: string;
  label: string;
  isDisabled?: boolean;
};

export function LiquidNextUIDropdown({
  label,
  actions,
  onAction,
  isDisabled,
  glass,
}: GlassProps & {
  label: string;
  actions: LiquidMenuAction[];
  onAction?: (key: string) => void;
  isDisabled?: boolean;
}) {
  return (
    <Dropdown>
      <LiquidNextUIButton glass={glass} isDisabled={isDisabled}>
        {label}
        <span aria-hidden="true">⌄</span>
      </LiquidNextUIButton>
      <Dropdown.Popover className={styles.overlay}>
        <GlassSurface
          {...glass}
          radius={22}
          opacity={glass?.opacity ?? 0.1}
          blur={glass?.blur ?? 0}
          thickness={glass?.thickness ?? 80}
        >
          <Dropdown.Menu
            aria-label={label}
            className={styles.menu}
            onAction={(key) => onAction?.(String(key))}
            disabledKeys={actions.filter((a) => a.isDisabled).map((a) => a.id)}
          >
            {actions.map((action) => (
              <Dropdown.Item
                key={action.id}
                id={action.id}
                textValue={action.label}
                className={styles.menuItem}
              >
                <Label>{action.label}</Label>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </GlassSurface>
      </Dropdown.Popover>
    </Dropdown>
  );
}

export function LiquidNextUITooltip({
  children,
  content,
  glass,
  isDisabled,
}: GlassProps & {
  children: ReactNode;
  content: ReactNode;
  isDisabled?: boolean;
}) {
  return (
    <Tooltip delay={350} isDisabled={isDisabled}>
      {children}
      <Tooltip.Content className={styles.tooltip} showArrow={false}>
        <GlassSurface
          {...glass}
          radius={16}
          opacity={0.8}
          blur={2}
          thickness={35}
        >
          <div className={styles.tooltipBody}>{content}</div>
        </GlassSurface>
      </Tooltip.Content>
    </Tooltip>
  );
}

export function LiquidNextUIPopover({
  triggerLabel,
  title,
  children,
  glass,
  isDisabled,
}: GlassProps & {
  triggerLabel: string;
  title: string;
  children: ReactNode;
  isDisabled?: boolean;
}) {
  return (
    <Popover>
      <LiquidNextUIButton glass={glass} isDisabled={isDisabled}>
        {triggerLabel}
      </LiquidNextUIButton>
      <Popover.Content className={styles.overlay}>
        <Popover.Dialog aria-label={title} className={styles.dialog}>
          <GlassSurface
            {...glass}
            radius={24}
            opacity={0.75}
            blur={3}
            thickness={55}
          >
            <div className={styles.popoverBody}>
              <Popover.Heading className={styles.title}>
                {title}
              </Popover.Heading>
              <div className={styles.description}>{children}</div>
            </div>
          </GlassSurface>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

export function LiquidNextUIAccordion({
  items,
  glass,
  className = "",
  ...props
}: GlassProps &
  Omit<AccordionProps, "children"> & {
    items: { id: string; title: string; content: ReactNode }[];
  }) {
  return (
    <GlassSurface
      {...glass}
      radius={24}
      opacity={glass?.opacity ?? 0.1}
      blur={glass?.blur ?? 0}
      thickness={glass?.thickness ?? 80}
      className={styles.accordionSurface}
    >
      <Accordion {...props} className={`${styles.accordion} ${className}`}>
        {items.map((item) => (
          <Accordion.Item
            id={item.id}
            key={item.id}
            className={styles.accordionItem}
          >
            <Accordion.Heading>
              <Accordion.Trigger className={styles.accordionTrigger}>
                {item.title}
                <span className={styles.chevron} aria-hidden="true">
                  ⌄
                </span>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={styles.accordionPanel}>
              <Accordion.Body className={styles.accordionBody}>
                {item.content}
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </GlassSurface>
  );
}

export function LiquidNextUIAlert({
  title,
  children,
  status = "success",
  glass,
  onDismiss,
}: GlassProps & {
  title: string;
  children: ReactNode;
  status?: "success" | "warning" | "danger" | "accent" | "default";
  onDismiss?: () => void;
}) {
  return (
    <GlassSurface
      {...glass}
      radius={22}
      opacity={glass?.opacity ?? 0.1}
      blur={glass?.blur ?? 0}
      thickness={glass?.thickness ?? 80}
      className={styles.alertSurface}
    >
      <Alert status={status} role="status" className={styles.alert}>
        <Alert.Indicator className={styles.alertIcon}>
          <span aria-hidden="true">
            {status === "success" ? "✓" : status === "danger" ? "!" : "i"}
          </span>
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title className={styles.title}>{title}</Alert.Title>
          <Alert.Description className={styles.description}>
            {children}
          </Alert.Description>
        </Alert.Content>
        {onDismiss && (
          <button
            className={styles.close}
            aria-label="Dismiss alert"
            onClick={onDismiss}
          >
            ×
          </button>
        )}
      </Alert>
    </GlassSurface>
  );
}

export function LiquidNextUIProgressBar({
  label,
  glass,
  className = "",
  ...props
}: GlassProps & Omit<ProgressBarProps, "children"> & { label: string }) {
  return (
    <ProgressBar {...props} className={`${styles.progress} ${className}`}>
      <Label>{label}</Label>
      <ProgressBar.Output />
      <GlassSurface
        {...glass}
        radius={12}
        opacity={0.35}
        blur={0}
        thickness={25}
        className={styles.progressSurface}
      >
        <ProgressBar.Track className={styles.progressTrack}>
          <ProgressBar.Fill className={styles.progressFill} />
        </ProgressBar.Track>
      </GlassSurface>
    </ProgressBar>
  );
}

export function LiquidNextUIProgressCircle({
  glass,
  className = "",
  ...props
}: GlassProps & Omit<ProgressCircleProps, "children">) {
  return (
    <GlassSurface
      {...glass}
      radius={48}
      opacity={0.25}
      blur={0}
      thickness={45}
      className={styles.circleSurface}
    >
      <ProgressCircle {...props} className={`${styles.circle} ${className}`}>
        <ProgressCircle.Track className={styles.circleTrack}>
          <ProgressCircle.TrackCircle className={styles.circleBase} />
          <ProgressCircle.FillCircle className={styles.circleFill} />
        </ProgressCircle.Track>
      </ProgressCircle>
    </GlassSurface>
  );
}

export function LiquidNextUIToastProvider({
  glass,
  ...props
}: GlassProps & Omit<ToastProviderProps, "children">) {
  return (
    <Toast.Provider
      {...props}
      placement="bottom end"
      className={styles.toastRegion}
      width="min(380px, calc(100vw - 32px))"
      maxVisibleToasts={3}
    >
      {({ toast }) => (
        <Toast
          toast={toast}
          className={styles.toast}
          variant={toast.content.variant}
        >
          <GlassSurface
            {...glass}
            radius={24}
            opacity={0.86}
            blur={3}
            thickness={45}
          >
            <div className={styles.toastBody}>
              <Toast.Content className={styles.toastContent}>
                <Toast.Title className={styles.title}>
                  {toast.content.title}
                </Toast.Title>
                <Toast.Description className={styles.description}>
                  {toast.content.description}
                </Toast.Description>
              </Toast.Content>
              <Toast.CloseButton
                aria-label="Dismiss notification"
                className={styles.close}
              >
                ×
              </Toast.CloseButton>
            </div>
          </GlassSurface>
        </Toast>
      )}
    </Toast.Provider>
  );
}
