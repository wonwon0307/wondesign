import { InlineCode, Pre } from "@wondesign/ui/Code";
import { Hyperlink } from "@wondesign/ui/Links";
import { Heading, Paragraph } from "@wondesign/ui/Texts";

import { styles } from "./styles.css";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface PreProps {
  children: React.ReactElement<{ children: string; className?: string }>;
}

export const mdxComponents = {
  h1: ({ children, className, id }: Props) => (
    <Heading level={1} className={className} id={id}>
      {children}
    </Heading>
  ),
  h2: ({ children, className, id }: Props) => (
    <Heading level={2} className={className} id={id}>
      {children}
    </Heading>
  ),
  h3: ({ children, className, id }: Props) => (
    <Heading level={3} className={className} id={id}>
      {children}
    </Heading>
  ),
  h4: ({ children, className, id }: Props) => (
    <Heading level={4} className={className} id={id}>
      {children}
    </Heading>
  ),
  h5: ({ children, className, id }: Props) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn("h5 heading is not supported. rendering as h4 instead.");
    }
    return (
      <Heading level={4} className={className} id={id}>
        {children}
      </Heading>
    );
  },
  h6: ({ children, className, id }: Props) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn("h6 heading is not supported. rendering as h4 instead.");
    }
    return (
      <Heading level={4} className={className} id={id}>
        {children}
      </Heading>
    );
  },
  p: (props: Props) => (
    <Paragraph {...props} className={styles.paragraph} size="large" />
  ),
  a: (props: Props) => <Hyperlink {...props} appearance="primary" />,
  code: (props: Props) => <InlineCode {...props} size="large" />,
  pre: ({ children, ...rest }: PreProps) => (
    <Pre {...rest} size="large" code={children.props.children} />
  ),
};
