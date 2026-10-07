import type { IconProps } from "@wondesign/svg2tsx";
export function Alert({ size = "1em", ...props }: Readonly<IconProps>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      width={size}
      height={size}
    >
      <g clipPath="url(#prefix__a)">
        <path
          fill="currentColor"
          d="M8 2.667a5.333 5.333 0 1 0 0 10.666A5.333 5.333 0 0 0 8 2.667m-.662 2.666a.667.667 0 0 1 1.333 0v3.063a.667.667 0 1 1-1.333 0zm.662 6a.764.764 0 1 1 0-1.529.764.764 0 0 1 0 1.53"
        />
      </g>
      <defs>
        <clipPath id="prefix__a">
          <path fill="currentColor" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
