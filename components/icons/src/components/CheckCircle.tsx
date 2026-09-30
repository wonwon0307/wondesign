import type { IconProps } from "@wondesign/svg2tsx";
export function CheckCircle({ size = 16, ...props }: Readonly<IconProps>) {
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
        d="M8 1.333a6.667 6.667 0 1 1 0 13.333A6.667 6.667 0 0 1 8 1.333m0 1.334a5.333 5.333 0 1 0 0 10.666A5.333 5.333 0 0 0 8 2.667m2.357 2.92a.667.667 0 0 1 .998.88l-.055.063-3.724 3.725a.734.734 0 0 1-.973.056l-.064-.056-1.84-1.839a.667.667 0 0 1 .88-.999l.064.056 1.414 1.414z"
      />
    </svg>
  );
}
