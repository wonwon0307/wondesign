import type { ComponentType } from "react";
import type { IconProps } from "@wondesign/svg2tsx";

import { Alert } from "./components/Alert";
import { CheckCircle } from "./components/CheckCircle";
import { CheckFill } from "./components/CheckFill";
import { Check } from "./components/Check";
import { ChevronDown } from "./components/ChevronDown";
import { ChevronRight } from "./components/ChevronRight";
import { ColorTheme } from "./components/ColorTheme";
import { CopyCode } from "./components/CopyCode";
import { Copy } from "./components/Copy";
import { ExternalLink } from "./components/ExternalLink";
import { Info } from "./components/Info";
import { LoadingBubble } from "./components/LoadingBubble";
import { LoadingLine } from "./components/LoadingLine";
import { LoadingTail } from "./components/LoadingTail";
import { Loading } from "./components/Loading";
import { SidebarArrow } from "./components/SidebarArrow";
import { Sidebar } from "./components/Sidebar";
import { Warning } from "./components/Warning";

export type IconName =
  | "alert"
  | "check-circle"
  | "check-fill"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "color-theme"
  | "copy-code"
  | "copy"
  | "external-link"
  | "info"
  | "loading-bubble"
  | "loading-line"
  | "loading-tail"
  | "loading"
  | "sidebar-arrow"
  | "sidebar"
  | "warning";

export const iconMap: Record<IconName, ComponentType<IconProps>> = {
  alert: Alert,
  "check-circle": CheckCircle,
  "check-fill": CheckFill,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "color-theme": ColorTheme,
  "copy-code": CopyCode,
  copy: Copy,
  "external-link": ExternalLink,
  info: Info,
  "loading-bubble": LoadingBubble,
  "loading-line": LoadingLine,
  "loading-tail": LoadingTail,
  loading: Loading,
  "sidebar-arrow": SidebarArrow,
  sidebar: Sidebar,
  warning: Warning,
};
