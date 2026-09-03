type TagOptions = Pick<
  React.JSX.IntrinsicElements,
  "p" | "span" | "div" | "figcaption" | "dd"
>;

export interface DescriptionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: keyof TagOptions;
  ref?: React.Ref<HTMLElement>;
  size?: "small" | "medium" | "large";
  tone?: "default" | "muted" | "danger" | "success";
  wrap?: "balance" | "pretty";
  maxNumLines?: number;
  fullWidth?: boolean;
}
