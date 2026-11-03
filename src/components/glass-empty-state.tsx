"use client";

import { useId, type ReactNode } from "react";
import { GlassSurface, type GlassSurfaceProps } from "./glass-surface.js";
import styles from "./empty-state.module.css";

export type GlassEmptyStateProps = Omit<GlassSurfaceProps, "title" | "children"> & {
  title: ReactNode;
  description?: ReactNode;
  /** Decorative icon; provide its meaning in the title or description. */
  icon?: ReactNode;
  /** Supply your own buttons or links and their application behavior. */
  actions?: ReactNode;
};

export function GlassEmptyState({
  title,
  description,
  icon,
  actions,
  className = "",
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  ...props
}: GlassEmptyStateProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const hasDescription = description !== undefined && description !== null;
  return (
    <GlassSurface
      radius={24}
      role="region"
      {...props}
      className={`${styles.surface} ${className}`}
      aria-labelledby={labelledBy ?? (props["aria-label"] ? undefined : titleId)}
      aria-describedby={describedBy ?? (hasDescription ? descriptionId : undefined)}
    >
      <div className={styles.layout}>
        {icon != null && <div className={styles.icon} aria-hidden="true">{icon}</div>}
        <h2 className={styles.title} id={titleId}>{title}</h2>
        {hasDescription && <div className={styles.description} id={descriptionId}>{description}</div>}
        {actions != null && <div className={styles.actions}>{actions}</div>}
      </div>
    </GlassSurface>
  );
}
