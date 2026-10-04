import type { IconProps } from "@wondesign/svg2tsx";
export function DownloadCode({ size = 16, ...props }: Readonly<IconProps>) {
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
        d="m2.86 8 2.987-3.573a.668.668 0 0 0-1.027-.854l-3.333 4a.67.67 0 0 0 0 .847l3.22 4a.667.667 0 0 0 .876.145.666.666 0 0 0 .164-.985zm11.66-.42-3.187-4a.668.668 0 1 0-1.04.84L13.14 8l-2.987 3.58a.667.667 0 0 0 .087.94c.12.097.272.149.427.147a.67.67 0 0 0 .513-.24l3.333-4a.67.67 0 0 0 .007-.847"
      />
      <path
        fill="currentColor"
        d="M10.48 7.607a.667.667 0 0 0-.94 0l-.873.82V5.333a.667.667 0 0 0-1.334 0v3.06l-.86-.866a.67.67 0 1 0-.946.946l2 2a.67.67 0 0 0 .933.007l2-1.933a.667.667 0 0 0 .02-.94"
      />
    </svg>
  );
}
