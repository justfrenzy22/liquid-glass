import styles from "./containers.module.css";
import { GlassSurface, type GlassSurfaceProps } from "./glass-surface.js";

export function GlassCard({ className = "", ...props }: GlassSurfaceProps) {
  return <GlassSurface {...props} className={`${styles.card} ${className}`} />;
}
export function GlassPanel({ className = "", ...props }: GlassSurfaceProps) {
  return (
    <GlassSurface
      opacity={0.78}
      radius={28}
      {...props}
      className={`${styles.panel} ${className}`}
    />
  );
}
export function GlassToolbar({
  className = "",
  "aria-label": label = "File actions",
  children,
  ...props
}: GlassSurfaceProps) {
  return (
    <GlassSurface radius={18} {...props} className={`${styles.toolbar} ${className}`}>
      <div
        role="group"
        aria-label={label}
        className={styles.toolbarContent}
      >
        {children}
      </div>
    </GlassSurface>
  );
}
export function GlassNavbar({
  children,
  "aria-label": label = "Main navigation",
  ...props
}: GlassSurfaceProps) {
  return (
    <GlassSurface
      radius={18}
      {...props}
      className={`${styles.navbar} ${props.className ?? ""}`}
    >
      <nav aria-label={label} className={styles.navContent}>
        {children}
      </nav>
    </GlassSurface>
  );
}
