import { TabLink } from "@wondesign/ui/Buttons";

import type { DocsMeta } from "@/types/document";
import { styles } from "./styles.css";

interface Props {
  meta: DocsMeta;
}

export function DocumentHeader({ meta }: Readonly<Props>) {
  return (
    <div className={styles.header}>
      <h1>{meta.title}</h1>
      <h3>{meta.description}</h3>
      {/*breadcrumbs*/}
      {meta.type === "component" && (
        <div className={styles.tabs}>
          <TabLink href="./overview">Overview</TabLink>
          <TabLink href="./examples">Examples</TabLink>
          <TabLink href="./api">API</TabLink>
          <TabLink href="./changelog">Changelog</TabLink>
        </div>
      )}
    </div>
  );
}
