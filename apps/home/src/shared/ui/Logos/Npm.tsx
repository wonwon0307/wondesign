import type { IconProps } from "@wondesign/ui/Icons";

export function NpmLogo({
  size = 24,
  color = "#C40000",
  ...props
}: Readonly<IconProps>) {
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
        fill={color}
        d="M8 8.356V6.581h-.89v1.777zM16 4.8H0v5.333h4.444v.89H8v-.889h8zm-11.556.89v3.557h-.889V6.581h-.889v2.666H.889V5.691zm4.445 0v3.557H7.11v.89H5.334V5.693zm6.222 0v3.557h-.889V6.581h-.89v2.666h-.889V6.581h-.888v2.666H9.777V5.691z"
      />
    </svg>
  );
}
