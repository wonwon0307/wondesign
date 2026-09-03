type TagOptions = Pick<React.JSX.IntrinsicElements, "p" | "div" | "span">;

export interface ParagraphProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: keyof TagOptions;
  ref?: React.Ref<HTMLElement>;
  size?: "small" | "medium" | "large";
  tone?: "default" | "muted";
  maxNumLines?: number;
}
