"use client";

import type { ComponentProps, ReactNode } from "react";
import { Avatar, AvatarGroup, Badge, Chip, ToggleButton } from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-identity.module.css";

type GlassExtras = { glass?: GlassConfig };
export type LiquidPerson = {
  id: string;
  name: string;
  initials: string;
  src?: string;
};
function Lens({
  children,
  glass,
  className = "",
  radius = 24,
}: GlassExtras & { children: ReactNode; className?: string; radius?: number }) {
  return (
    <GlassSurface
      {...glass}
      radius={radius}
      opacity={glass?.opacity ?? 0.1}
      blur={glass?.blur ?? 0}
      thickness={50}
      className={className}
    >
      {children}
    </GlassSurface>
  );
}
function AvatarContent({
  person,
  glass,
}: { person: LiquidPerson } & GlassExtras) {
  return (
    <>
      {person.src && (
        <Avatar.Image
          src={person.src}
          alt={person.name}
          className={styles.image}
        />
      )}
      <Avatar.Fallback className={styles.fallback}>
        <Lens glass={glass} className={styles.avatarLens}>
          <span className={styles.initials}>{person.initials}</span>
        </Lens>
      </Avatar.Fallback>
    </>
  );
}
export function LiquidNextUIAvatar({
  person,
  glass,
  ...props
}: Omit<ComponentProps<typeof Avatar>, "children"> &
  GlassExtras & { person: LiquidPerson }) {
  return (
    <Avatar {...props} aria-label={person.name} className={styles.avatar}>
      <AvatarContent person={person} glass={glass} />
    </Avatar>
  );
}
export function LiquidNextUIAvatarGroup({
  people,
  glass,
  max = 3,
}: GlassExtras & { people: LiquidPerson[]; max?: number }) {
  return (
    <AvatarGroup
      max={max}
      className={styles.avatarGroup}
      aria-label="Collaborators"
    >
      {people.map((person) => (
        <Avatar
          key={person.id}
          aria-label={person.name}
          className={styles.avatar}
        >
          <AvatarContent person={person} glass={glass} />
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
export function LiquidNextUIBadge({
  children,
  label,
  glass,
}: GlassExtras & { children: ReactNode; label: string }) {
  return (
    <Badge className={styles.badge}>
      <Badge.Anchor>{children}</Badge.Anchor>
      <Badge.Label className={styles.badgeLabel} aria-hidden="true">
        <Lens glass={glass} className={styles.badgeLens} radius={14}>
          <span>{label}</span>
        </Lens>
      </Badge.Label>
    </Badge>
  );
}
export function LiquidNextUIChip({
  children,
  glass,
  tone = "neutral",
}: GlassExtras & {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning";
}) {
  return (
    <Chip className={styles.chip} data-tone={tone}>
      <Lens glass={glass} className={styles.chipLens} radius={18}>
        <Chip.Label className={styles.chipLabel}>
          <span className={styles.statusDot} aria-hidden="true" />
          {children}
        </Chip.Label>
      </Lens>
    </Chip>
  );
}
export function LiquidNextUIToggleButton({
  children,
  glass,
  ...props
}: Omit<ComponentProps<typeof ToggleButton>, "children"> &
  GlassExtras & { children: ReactNode }) {
  return (
    <ToggleButton {...props} className={styles.toggle}>
      <Lens glass={glass} className={styles.toggleLens}>
        <span className={styles.toggleContent}>{children}</span>
      </Lens>
    </ToggleButton>
  );
}
