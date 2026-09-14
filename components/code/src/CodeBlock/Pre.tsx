import clsx from "clsx";

import { styles } from "./styles.css";

export interface PreProps extends Omit<
  React.HTMLAttributes<HTMLPreElement>,
  "children"
> {
  code: string;
  ref?: React.Ref<HTMLPreElement>;
  size?: "small" | "large";
  vertical?: "full" | "scroll"; // "expandable"
  numLines?: number;
  horizontal?: "wrap" | "scroll";
  showLineNumbers?: boolean;
}

export function Pre({
  code,
  size = "small",
  vertical = "full",
  numLines = 10,
  horizontal = "scroll",
  showLineNumbers = false,
  className,
  style,
  ...rest
}: Readonly<PreProps>) {
  const lines = code.split("\n");

  return (
    <pre
      {...rest}
      className={clsx(
        styles.pre({
          size,
          horizontal,
          vertical,
        }),
        className,
      )}
      style={{
        ...style,
        maxHeight: vertical === "scroll" ? `${numLines}lh` : "auto",
      }}
    >
      <code>
        {lines.map((line, index) => (
          <span
            key={`${index}:${line}`}
            className={styles.line({ showLineNumbers })}
            data-line={index + 1}
          >
            {line}
          </span>
        ))}
      </code>
    </pre>
  );
}
