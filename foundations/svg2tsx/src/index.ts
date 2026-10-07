export { defineConfig } from "./config/defineConfig";

export type { Config } from "./config/types";

export type IconProps = {
  size?: number | string;
} & React.SVGProps<SVGSVGElement>;
