import { render } from "@testing-library/react";

import { DocumentTabs } from "@/widgets/document";

describe("DocumentTabs", () => {
  it("sorts tabs correctly", () => {
    // 아무 순서로 집어넣어도 정렬되어 렌더링 되는지 테스트
    const tabs = [
      { slug: "test", url: "/test" },
      { slug: "api", url: "/api" },
      { slug: "css-variables", url: "/css-variables" },
      { slug: "random", url: "/random" },
      { slug: "examples", url: "/examples" },
      { slug: "overview", url: "/overview" },
    ];

    const { getAllByRole } = render(<DocumentTabs tabs={tabs} />);

    const links = getAllByRole("link").map((link) => link.textContent);

    expect(links).toEqual([
      "Overview",
      "Examples",
      "API",
      "CSS Variables",
      "Random",
      "Test",
    ]);
  });

  it("sorts non-priority tabs alphabetically", () => {
    const tabs = [
      { slug: "zeta", url: "/zeta" },
      { slug: "alpha", url: "/alpha" },
      { slug: "mid", url: "/mid" },
    ];

    const { getAllByRole } = render(<DocumentTabs tabs={tabs} />);

    const links = getAllByRole("link").map((link) => link.textContent);

    expect(links).toEqual(["Alpha", "Mid", "Zeta"]);
  });
});
