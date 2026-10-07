import { AppIcon } from "@wondesign/ui/Icons";
import { IconLink } from "@wondesign/ui/Links";
import { Callout, Heading } from "@wondesign/ui/Texts";
import { Tooltip } from "@wondesign/ui/Tooltip";

import { GithubLogo, NpmLogo } from "@/shared/ui/Logos";
import { styles } from "./styles.css";

interface Props {
  name: string;
  relPath: string;
  children: React.ReactNode;
}

export function PackageInfo({ name, relPath, children }: Readonly<Props>) {
  return (
    <Callout
      title={<Header name={name} relPath={relPath} />}
      icon="package"
      size="large"
      className={styles.callout}
    >
      {children}
    </Callout>
  );
}

function Header({ name, relPath }: Readonly<Pick<Props, "name" | "relPath">>) {
  return (
    <div className={styles.header}>
      <Heading level={4}>{name}</Heading>
      <div className={styles.right}>
        <Tooltip
          text="View the package on npm"
          left={<AppIcon icon="external-link" />}
          keepMounted
          asChild
        >
          <IconLink href={`https://www.npmjs.com/package/${name}`} openInNewTab>
            <NpmLogo />
          </IconLink>
        </Tooltip>
        <Tooltip
          text="View the source code on GitHub"
          left={<AppIcon icon="external-link" />}
          keepMounted
          asChild
        >
          <IconLink
            href={`https://github.com/wonwon0307/wondesign/tree/main/${relPath}/`}
            openInNewTab
          >
            <GithubLogo />
          </IconLink>
        </Tooltip>
        <Tooltip
          text="Report an issue"
          left={<AppIcon icon="external-link" />}
          keepMounted
          asChild
        >
          <IconLink
            href={`https://github.com/wonwon0307/wondesign/issues`}
            icon="warning"
            openInNewTab
            className={styles.report}
          />
        </Tooltip>
      </div>
    </div>
  );
}
