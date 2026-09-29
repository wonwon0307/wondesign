import { clsx } from "clsx";
import { tokens } from "@wondesign/tokens";

import { styles } from "./styles.css";

export interface PreProps
  extends
    Omit<React.HTMLAttributes<HTMLPreElement>, "children">,
    React.RefAttributes<HTMLPreElement> {
  code: string;
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
  const lines = code.replace(/\n$/, "").split("\n");

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
        maxHeight:
          vertical === "scroll"
            ? `calc(${numLines}lh + 2 * ${tokens.spacing.md})`
            : "auto",
      }}
    >
      <code className={styles.code({ showLineNumbers })}>
        {lines.map((line, index) => (
          <span
            key={`${index}:${line}`}
            className={styles.line({ showLineNumbers })}
            data-line={index + 1}
          >
            {line || " "}
          </span>
        ))}
      </code>
    </pre>
  );
}
