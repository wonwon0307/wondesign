import type { IconProps } from "@wondesign/svg2tsx";
export function Warning({ size = "1em", ...props }: Readonly<IconProps>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M14.317 11.836 9.35 2.688a1.53 1.53 0 0 0-2.687 0l-4.971 9.148a1.53 1.53 0 0 0 1.346 2.274h9.933a1.53 1.53 0 0 0 1.346-2.259zM7.244 5.309a.765.765 0 1 1 1.53 0v3.513a.765.765 0 0 1-1.53 0zm.786 6.889a.877.877 0 1 1 0-1.754.877.877 0 0 1 0 1.754"
      />
    </svg>
  );
}
