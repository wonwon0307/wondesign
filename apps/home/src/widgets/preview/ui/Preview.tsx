import { styles } from "./styles.css";

interface Props {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

export function Preview({
  children,
  orientation = "vertical",
}: Readonly<Props>) {
  return <div className={styles.preview({ orientation })}>{children}</div>;
}
