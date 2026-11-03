import type { ComponentProps } from "react";
import { LiquidNextUIButton, LiquidNextUISwitch, LiquidNextUISlider, LiquidNextUIInput } from "./heroui-controls.js";
import { LiquidNextUICard } from "./heroui-essentials.js";
import { LiquidNextUIToolbar } from "./heroui-utilities.js";
import { LiquidNextUISearchField } from "./heroui-forms.js";
import { LiquidNextUINavbar, LiquidNextUISidebar } from "./heroui-navigation.js";

// Public names share the exact same implementations and props, not separate skins.
export {
  LiquidNextUIButton as GlassButton,
  LiquidNextUISwitch as GlassSwitch,
  LiquidNextUISlider as GlassSlider,
  LiquidNextUIInput as GlassInput,
  LiquidNextUICard as GlassCard,
  LiquidNextUIToolbar as GlassToolbar,
  LiquidNextUISearchField as GlassSearch,
  LiquidNextUINavbar as GlassNavbar,
  LiquidNextUISidebar as GlassSidebar,
};
export type GlassButtonProps = ComponentProps<typeof LiquidNextUIButton>;
export type GlassSwitchProps = ComponentProps<typeof LiquidNextUISwitch>;
export type GlassSliderProps = ComponentProps<typeof LiquidNextUISlider>;
export type GlassInputProps = ComponentProps<typeof LiquidNextUIInput>;
export type GlassCardProps = ComponentProps<typeof LiquidNextUICard>;
export type GlassToolbarProps = ComponentProps<typeof LiquidNextUIToolbar>;
export type GlassSearchProps = ComponentProps<typeof LiquidNextUISearchField>;
export type GlassNavbarProps = ComponentProps<typeof LiquidNextUINavbar>;
export type GlassSidebarProps = ComponentProps<typeof LiquidNextUISidebar>;
