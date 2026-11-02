"use client";

import type { ComponentProps, ReactNode } from "react";
import {
  Button,
  ButtonGroup,
  CloseButton,
  Kbd,
  Label,
  Link,
  Meter,
  ScrollShadow,
  Separator,
  Skeleton,
  Spinner,
  Surface,
  Tag,
  TagGroup,
  Toolbar,
  Typography,
} from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-additions.module.css";

export type LiquidSurfaceExtras = {
  glass?: GlassConfig;
  appearance?: "normal" | "glass" | "colored";
};
export function LiquidNextUISurface({
  children,
  glass,
  appearance = "glass",
  className = "",
  ...props
}: ComponentProps<typeof Surface> & LiquidSurfaceExtras) {
  const body = (
    <Surface
      data-liquid-glass=""
      {...props}
      className={`${styles.surfaceBody} ${appearance === "normal" ? styles.solid : ""} ${className}`}
    >
      {children}
    </Surface>
  );
  return appearance === "normal" ? (
    body
  ) : (
    <GlassSurface
      radius={22}
      blur={0}
      opacity={0.1}
      thickness={70}
      refraction={1}
      {...glass}
      className={appearance === "colored" ? styles.colored : undefined}
    >
      {body}
    </GlassSurface>
  );
}
export type LiquidAction = { id: string; label: string; isDisabled?: boolean };
export function LiquidNextUIButtonGroup({
  actions,
  onAction,
  isDisabled,
  glass,
}: {
  actions: LiquidAction[];
  onAction?: (id: string) => void;
  isDisabled?: boolean;
  glass?: GlassConfig;
}) {
  return (
    <LiquidNextUISurface glass={glass}>
      <ButtonGroup
        aria-label="File actions"
        className={styles.actions}
        isDisabled={isDisabled}
      >
        {actions.map((action) => (
          <Button
            key={action.id}
            className={styles.action}
            isDisabled={isDisabled || action.isDisabled}
            onPress={() => onAction?.(action.id)}
          >
            {action.label}
          </Button>
        ))}
      </ButtonGroup>
    </LiquidNextUISurface>
  );
}
export function LiquidNextUICloseButton({
  glass,
  ...props
}: ComponentProps<typeof CloseButton> & { glass?: GlassConfig }) {
  return (
    <span className={styles.closeWrap}>
      <LiquidNextUISurface glass={glass}>
        <CloseButton
          {...props}
          className={styles.close}
          aria-label={props["aria-label"] ?? "Close"}
        >
          <span aria-hidden="true">×</span>
        </CloseButton>
      </LiquidNextUISurface>
    </span>
  );
}
export function LiquidNextUIToolbar({
  children,
  glass,
  ...props
}: ComponentProps<typeof Toolbar> & { glass?: GlassConfig }) {
  return (
    <LiquidNextUISurface glass={glass}>
      <Toolbar {...props} className={styles.actions}>
        {children}
      </Toolbar>
    </LiquidNextUISurface>
  );
}
export function LiquidNextUIMeter({
  label,
  glass,
  ...props
}: Omit<ComponentProps<typeof Meter>, "children"> & {
  label: string;
  glass?: GlassConfig;
}) {
  return (
    <Meter {...props} className={styles.meter}>
      <div className={styles.between}>
        <Label>{label}</Label>
        <Meter.Output />
      </div>
      <LiquidNextUISurface glass={glass}>
        <Meter.Track className={styles.meterTrack}>
          <Meter.Fill className={styles.meterFill} />
        </Meter.Track>
      </LiquidNextUISurface>
    </Meter>
  );
}
export function LiquidNextUISkeleton({
  className = "",
  ...props
}: ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      {...props}
      aria-hidden="true"
      className={`${styles.skeleton} ${className}`}
    />
  );
}
export function LiquidNextUISpinner({
  className = "",
  ...props
}: ComponentProps<typeof Spinner>) {
  return <Spinner {...props} className={`${styles.spinner} ${className}`} />;
}
export function LiquidNextUIScrollShadow({
  className = "",
  ...props
}: ComponentProps<typeof ScrollShadow>) {
  return (
    <ScrollShadow {...props} className={`${styles.scroll} ${className}`} />
  );
}
export function LiquidNextUISeparator({
  className = "",
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator {...props} className={`${styles.separator} ${className}`} />
  );
}
export function LiquidNextUIKbd({
  children,
  ...props
}: ComponentProps<typeof Kbd>) {
  return (
    <Kbd {...props} className={styles.kbd}>
      {children}
    </Kbd>
  );
}
export function LiquidNextUILink({
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link {...props} className={styles.link}>
      {children}
    </Link>
  );
}
export function LiquidNextUITypography({
  className = "",
  ...props
}: ComponentProps<typeof Typography>) {
  return (
    <Typography {...props} className={`${styles.typography} ${className}`} />
  );
}
export function LiquidNextUITagGroup({
  label,
  items,
  onRemove,
  isDisabled,
  glass,
}: {
  label: string;
  items: { id: string; label: string }[];
  onRemove?: (ids: Set<string>) => void;
  isDisabled?: boolean;
  glass?: GlassConfig;
}) {
  return (
    <TagGroup
      className={styles.field}
      disabledKeys={isDisabled ? items.map((item) => item.id) : []}
      onRemove={
        onRemove ? (ids) => onRemove(new Set([...ids].map(String))) : undefined
      }
    >
      <Label>{label}</Label>
      <TagGroup.List
        items={items}
        className={styles.tags}
        renderEmptyState={() => (
          <span className={styles.help}>No tags. Add one to get started.</span>
        )}
      >
        {(item) => (
          <Tag id={item.id} textValue={item.label} className={styles.tag}>
            {() => (
              <LiquidNextUISurface glass={glass}>
                <span className={styles.tagInner}>
                  {item.label}
                  {onRemove && (
                    <Tag.RemoveButton
                      aria-label={`Remove ${item.label}`}
                      className={styles.tagRemove}
                    >
                      ×
                    </Tag.RemoveButton>
                  )}
                </span>
              </LiquidNextUISurface>
            )}
          </Tag>
        )}
      </TagGroup.List>
    </TagGroup>
  );
}

export function LiquidActionButton({
  children,
  ...props
}: ComponentProps<typeof Button> & { children: ReactNode }) {
  return (
    <Button {...props} className={styles.action}>
      {children}
    </Button>
  );
}
