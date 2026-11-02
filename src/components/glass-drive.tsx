import styles from "./containers.module.css";
import type { ReactNode } from "react";
import { GlassCard } from "./glass-containers.js";
import { GlassButton, type GlassButtonProps } from "./glass-button.js";
import { GlassSearch, type GlassInputProps } from "./glass-input.js";
import type { GlassSurfaceProps } from "./glass-surface.js";

export type GlassFileCardProps = GlassSurfaceProps & {
  name: string;
  details?: string;
  actions?: ReactNode;
};
export function GlassFileCard({
  name,
  details,
  actions,
  children,
  ...props
}: GlassFileCardProps) {
  return (
    <GlassCard {...props}>
      <div
        className={styles.fileIcon}
        aria-hidden="true"
      >
        FILE
      </div>
      <h3 className={styles.title}>{name}</h3>
      {details && <p className={styles.details}>{details}</p>}
      {children}
      {actions && <div className={styles.actions}>{actions}</div>}
    </GlassCard>
  );
}
export function GlassFolderCard({
  name,
  details,
  actions,
  children,
  ...props
}: GlassFileCardProps) {
  return (
    <GlassCard {...props}>
      <svg
        className={styles.folderIcon}
        viewBox="0 0 48 48"
        aria-hidden="true"
        fill="#d4d4d8"
        stroke="#71717a"
      >
        <path d="M4 12h14l5 5h21v23H4z" />
        <path d="M4 12V8h14l5 5h21v4" />
      </svg>
      <h3 className={styles.title}>{name}</h3>
      {details && <p className={styles.details}>{details}</p>}
      {children}
      {actions && <div className={styles.actions}>{actions}</div>}
    </GlassCard>
  );
}
/** The caller owns file selection and uploading; this is a semantic action button. */
export function GlassUploadButton({
  children = "Upload file",
  ...props
}: GlassButtonProps) {
  return (
    <GlassButton {...props}>
      <span aria-hidden="true">↑</span>
      {children}
    </GlassButton>
  );
}
export function GlassSearchBar({
  placeholder = "Search your drive…",
  ...props
}: GlassInputProps) {
  return <GlassSearch placeholder={placeholder} {...props} />;
}
