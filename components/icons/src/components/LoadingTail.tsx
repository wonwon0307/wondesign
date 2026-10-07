import type { IconProps } from "@wondesign/svg2tsx";
export function LoadingTail({ size = "1em", ...props }: Readonly<IconProps>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M10.249 1.646a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 12 19.5v3C6.201 22.5 1.5 17.8 1.5 12c0-5.145 3.726-9.51 8.749-10.354"
      />
      <path
        fill="currentColor"
        d="M16.892 4.298a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 22.5 12c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084 1.5 1.5 0 0 1-.115-2.118"
      />
      <defs>
        <linearGradient
          id="prefix__a"
          x1={6.75}
          x2={6.75}
          y1={2.73}
          y2={20.787}
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={1} stopOpacity={0.55} />
        </linearGradient>
        <linearGradient
          id="prefix__b"
          x1={17.25}
          x2={17.25}
          y1={6.649}
          y2={20.097}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity={0} />
          <stop offset={1} stopOpacity={0.55} />
        </linearGradient>
      </defs>
    </svg>
  );
}
