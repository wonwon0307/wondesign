import { act, render } from "@testing-library/react";
import { type DocsTocEntry } from "@wondocs/core/pages";

import { DocumentTabs, DocumentTOC } from "@/widgets/document";

let intersect: IntersectionObserverCallback;
vi.stubGlobal(
  "IntersectionObserver",
  vi.fn(function (cb: IntersectionObserverCallback) {
    intersect = cb;
    return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
  }),
);

describe("DocumentPage - Tabs", () => {
  it("sorts tabs correctly", () => {
    // 아무 순서로 집어넣어도 정렬되어 렌더링 되는지 테스트
    const tabs = [
      { slug: "test", url: "/test" },
      { slug: "api", url: "/api" },
      { slug: "random", url: "/random" },
      { slug: "examples", url: "/examples" },
      { slug: "overview", url: "/overview" },
    ];

    const { getAllByRole } = render(<DocumentTabs tabs={tabs} />);

    const links = getAllByRole("link").map((link) => link.textContent);

    expect(links).toEqual(["Overview", "Examples", "API", "Random", "Test"]);
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

describe("DocumentPage - TOC", () => {
  it("marks the intersecting heading as active", () => {
    const toc = [
      { value: "Section 1", href: "#section-1", depth: 1 },
      { value: "Section 2", href: "#section-2", depth: 1 },
    ] as DocsTocEntry[];

    const heading1 = document.createElement("h1");
    heading1.id = "section-1";
    const heading2 = document.createElement("h1");
    heading2.id = "section-2";
    document.body.append(heading1, heading2);

    const { getByText } = render(<DocumentTOC items={toc} />);

    act(() => {
      intersect(
        [
          {
            isIntersecting: true,
            target: heading2,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    const link1 = getByText("Section 1").closest("a");
    const link2 = getByText("Section 2").closest("a");

    expect(link2?.getAttribute("aria-current")).toBe("location");
    expect(link1?.getAttribute("aria-current")).toBeNull();

    // toc에 없는 heading만 visible해지면(topMost를 못 찾으면) setActiveId를 호출하지 않아야 한다.
    const unrelatedHeading = document.createElement("h1");
    unrelatedHeading.id = "not-in-toc";
    document.body.append(unrelatedHeading);

    act(() => {
      intersect(
        [
          {
            isIntersecting: false,
            target: heading2,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    // setActiveId는 sticky하기 때문에, 화면에서 벗어나더라도 link2에 location이 남는다
    expect(link2?.getAttribute("aria-current")).toBe("location");
    expect(link1?.getAttribute("aria-current")).toBeNull();

    // 관계 없는 heading이 화면에 나타난다 (coverage purpose)
    act(() => {
      intersect(
        [
          {
            isIntersecting: true,
            target: unrelatedHeading,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    heading1.remove();
    heading2.remove();
    unrelatedHeading.remove();
  });
});
