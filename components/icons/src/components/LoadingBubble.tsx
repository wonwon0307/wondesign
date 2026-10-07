import type { IconProps } from "@wondesign/svg2tsx";
export function LoadingBubble({ size = "1em", ...props }: Readonly<IconProps>) {
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
        fillRule="evenodd"
        d="M13 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4m-6.259-3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m11.578.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4m2.181-4.181a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M4.5 8a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m15.286-.793a1 1 0 1 1 0 2 1 1 0 0 1 0-2M10 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6m7.5 3a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1"
        clipRule="evenodd"
      />
    </svg>
  );
}
