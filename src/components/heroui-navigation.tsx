"use client";

import { useId, type ReactNode } from "react";
import { Button } from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-navigation.module.css";

export type LiquidNavigationItem = {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  count?: number;
};
export type LiquidNavigationAppearance = "normal" | "glass" | "colored";
type NavigationProps = {
  items: LiquidNavigationItem[];
  activeKey?: string;
  onNavigate?: (key: string) => void;
  appearance?: LiquidNavigationAppearance;
  glass?: GlassConfig;
  className?: string;
  label?: string;
};

function Surface({ children, appearance, glass }: {
  children: ReactNode;
  appearance: LiquidNavigationAppearance;
  glass?: GlassConfig;
}) {
  return appearance === "normal" ? (
    <div className={styles.solid}>{children}</div>
  ) : (
    <GlassSurface radius={24} blur={0} opacity={0.1} thickness={80}
      refraction={1} {...glass} className={styles.surface}>
      {children}
    </GlassSurface>
  );
}

function Items({ items, activeKey, onNavigate, compact = false }: NavigationProps & { compact?: boolean }) {
  return items.map((item) => (
    <a key={item.id} href={item.href} className={styles.item}
      aria-current={activeKey === item.id ? "page" : undefined}
      aria-label={compact ? item.label : undefined}
      title={compact ? item.label : undefined}
      onClick={() => onNavigate?.(item.id)}>
      {(item.icon || compact) && <span className={styles.icon} aria-hidden="true">{item.icon ?? item.label.slice(0, 1)}</span>}
      <span className={styles.itemLabel}>{item.label}</span>
      {item.count !== undefined && <span className={styles.count} aria-label={`${item.count} items`}>{item.count}</span>}
    </a>
  ));
}

export function LiquidNextUINavbar({ brand, actions, items, activeKey, onNavigate,
  appearance = "glass", glass, className = "", label = "Main navigation" }: NavigationProps & {
    brand: ReactNode;
    actions?: ReactNode;
  }) {
  return (
    <header className={`${styles.root} ${className}`} data-appearance={appearance}>
      <Surface appearance={appearance} glass={glass}>
        <div className={styles.navbar}>
          <div className={styles.brand}>{brand}</div>
          <nav aria-label={label} className={styles.topItems}>
            <Items items={items} activeKey={activeKey} onNavigate={onNavigate} />
          </nav>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </Surface>
    </header>
  );
}

export function LiquidNextUISidebar({ items, activeKey, onNavigate, heading = "Workspace",
  footer, isCollapsed = false, onCollapsedChange, appearance = "glass", glass,
  className = "", label = "Workspace navigation" }: NavigationProps & {
    heading?: string;
    footer?: ReactNode;
    isCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
  }) {
  const id = useId();
  return (
    <aside className={`${styles.root} ${styles.sidebar} ${className}`}
      data-appearance={appearance} data-collapsed={isCollapsed} aria-label={heading}>
      <Surface appearance={appearance} glass={glass}>
        <div className={styles.sideContent}>
          <div className={styles.sideHeading}>
            <span className={styles.heading}>{heading}</span>
            {onCollapsedChange && <Button className={styles.collapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!isCollapsed} aria-controls={id}
              onPress={() => onCollapsedChange(!isCollapsed)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="3" /><path d="M9 4v16" />
                <path d={isCollapsed ? "m13 9 3 3-3 3" : "m16 9-3 3 3 3"} />
              </svg>
            </Button>}
          </div>
          <nav id={id} aria-label={label} className={styles.sideItems}>
            <Items items={items} activeKey={activeKey} onNavigate={onNavigate} compact={isCollapsed} />
          </nav>
          {footer && !isCollapsed && <div className={styles.sideFooter}>{footer}</div>}
        </div>
      </Surface>
    </aside>
  );
}
