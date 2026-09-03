type TagOptions = Pick<
  React.JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

type HeadingVariants = 1 | 2 | 3 | 4 | 5 | 6;

export const tagMap: Record<HeadingVariants, keyof TagOptions> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingVariants;
  children: React.ReactNode;
  as?: keyof TagOptions;
  weight?: "regular" | "semibold" | "bold";
  maxNumLines?: number;
  ref?: React.Ref<HTMLHeadingElement>;
}
