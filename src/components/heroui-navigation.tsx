"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { Button } from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-navigation.module.css";
import { cn } from "../lib/cn.js";

export type LiquidNavbarClassNames = Partial<Record<"surface" | "content" | "brand" | "brandIcon" | "brandContent" | "navigation" | "item" | "actions", string>>;
export type LiquidSidebarClassNames = Partial<Record<"surface" | "container" | "headingRow" | "heading" | "collapseButton" | "header" | "actions" | "body" | "navigation" | "item" | "content" | "footer", string>>;

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

function Surface({ children, appearance, glass, className }: {
  children: ReactNode;
  appearance: LiquidNavigationAppearance;
  glass?: GlassConfig;
  className?: string;
}) {
  return appearance === "normal" ? (
    <div className={cn(styles.solid, className)}>{children}</div>
  ) : (
    <GlassSurface radius={24} blur={0} opacity={0.1} thickness={80}
      refraction={1} {...glass} className={cn(styles.surface, className)}>
      {children}
    </GlassSurface>
  );
}

function Items({ items, activeKey, onNavigate, compact = false, itemClassName }: NavigationProps & { compact?: boolean; itemClassName?: string }) {
  return items.map((item) => (
    <a key={item.id} href={item.href} className={cn(styles.item, itemClassName)}
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

export function LiquidNextUINavbar({ brand, brandIcon, brandHref, actions, items, activeKey, onNavigate, classNames,
  appearance = "glass", glass, className = "", label = "Main navigation" }: NavigationProps & {
    /** Brand content: text, styled JSX, an image, SVG or your own link. */
    brand: ReactNode;
    /** Optional decorative icon placed alongside the brand content. */
    brandIcon?: ReactNode;
    /** Turn the whole brand into a link. Omit when brand already contains a link. */
    brandHref?: string;
    /** Tailwind classes for individual navbar parts. */
    classNames?: LiquidNavbarClassNames;
    actions?: ReactNode;
  }) {
  const Brand = brandHref != null ? "a" : "div";
  return (
    <header className={cn(styles.root, className)} data-appearance={appearance}>
      <Surface appearance={appearance} glass={glass} className={classNames?.surface}>
        <div className={cn(styles.navbar, classNames?.content)} data-slot="navbar-content">
          <Brand className={cn(styles.brand, classNames?.brand)} href={brandHref} data-slot="navbar-brand">
            {brandIcon != null && <span className={cn(styles.brandIcon, classNames?.brandIcon)} data-slot="navbar-brand-icon" aria-hidden="true">{brandIcon}</span>}
            <span className={cn(styles.brandText, classNames?.brandContent)} data-slot="navbar-brand-content">{brand}</span>
          </Brand>
          <nav aria-label={label} className={cn(styles.topItems, classNames?.navigation)}>
            <Items items={items} activeKey={activeKey} onNavigate={onNavigate} itemClassName={classNames?.item} />
          </nav>
          {actions && <div className={cn(styles.actions, classNames?.actions)}>{actions}</div>}
        </div>
      </Surface>
    </header>
  );
}

export function LiquidNextUISidebar({ items = [], activeKey, onNavigate, heading,
  header, actions, children, footer, style, classNames, isCollapsed = false, onCollapsedChange, appearance = "glass", glass,
  className = "", label = "Sidebar navigation" }: Omit<NavigationProps, "items"> & {
    /** Optional navigation links. Omit when supplying a fully custom body. */
    items?: LiquidNavigationItem[];
    /** Optional visible heading. Omit it for a sidebar without a title row. */
    heading?: string;
    /** Content at the top, above actions and navigation (for example a logo or skeleton). */
    header?: ReactNode;
    /** Primary actions below the header and above the navigation. */
    actions?: ReactNode;
    /** Custom body content below the optional navigation links. */
    children?: ReactNode;
    /** Bottom content, outside the scrollable body. */
    footer?: ReactNode;
    /** Root sizing and styling, such as width and height. */
    style?: CSSProperties;
    /** Tailwind classes for individual sidebar slots. */
    classNames?: LiquidSidebarClassNames;
    isCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
  }) {
  const id = useId();
  const hasHeading = Boolean(heading?.trim());
  const showHeader = (hasHeading && !isCollapsed) || Boolean(onCollapsedChange);
  const hasContent = (content: ReactNode) => content != null && content !== false;
  const hasBody = items.length > 0 || (!isCollapsed && hasContent(children));
  return (
    <aside className={cn(styles.root, styles.sidebar, className)}
      style={style} data-appearance={appearance} data-collapsed={isCollapsed} aria-label={hasHeading ? heading : label}>
      <Surface appearance={appearance} glass={glass} className={classNames?.surface}>
        <div className={cn(styles.sideContent, classNames?.container)}>
          {showHeader && <div className={cn(styles.sideHeading, classNames?.headingRow)} data-slot="sidebar-header" data-heading={hasHeading}>
            {hasHeading && <span className={cn(styles.heading, classNames?.heading)} data-slot="sidebar-heading">{heading}</span>}
            {onCollapsedChange && <Button className={cn(styles.collapse, classNames?.collapseButton)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!isCollapsed} aria-controls={hasBody ? id : undefined}
              onPress={() => onCollapsedChange(!isCollapsed)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="3" /><path d="M9 4v16" />
                <path d={isCollapsed ? "m13 9 3 3-3 3" : "m16 9-3 3 3 3"} />
              </svg>
            </Button>}
          </div>}
          {!isCollapsed && hasContent(header) && <div className={cn(styles.sideSlot, classNames?.header)} data-slot="sidebar-top">{header}</div>}
          {!isCollapsed && hasContent(actions) && <div className={cn(styles.sideSlot, classNames?.actions)} data-slot="sidebar-actions">{actions}</div>}
          {hasBody && <div id={id} className={cn(styles.sideBody, classNames?.body)} data-slot="sidebar-body">
            {items.length > 0 && <nav aria-label={label} className={cn(styles.sideItems, classNames?.navigation)}>
              <Items items={items} activeKey={activeKey} onNavigate={onNavigate} compact={isCollapsed} itemClassName={classNames?.item} />
            </nav>}
            {!isCollapsed && hasContent(children) && <div className={cn(styles.sideSlot, classNames?.content)} data-slot="sidebar-content">{children}</div>}
          </div>}
          {hasContent(footer) && !isCollapsed && <div className={cn(styles.sideFooter, classNames?.footer)} data-slot="sidebar-footer">{footer}</div>}
        </div>
      </Surface>
    </aside>
  );
}
