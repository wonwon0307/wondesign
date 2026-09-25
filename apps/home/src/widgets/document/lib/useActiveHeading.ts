"use client";

import { useEffect, useState } from "react";

export function useActiveHeading(hrefs: string[]) {
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // leading #를 잘라내고, HTML 요소만 추려낸다
    const headings = hrefs
      .map((href) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    // 한개도 없으면 관찰할 필요가 없으므로 조기 종료.
    if (headings.length === 0) return;

    // 현재 뷰포트와 교차하고 있는 heading의 id를 추적하며,
    // observer 콜백이 호출될 때마다 점진적으로 업데이트된다.
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        // entries에는 마지막 콜백 이후 가시성이 변경된 heading만 포함되므로,
        // visible 세트를 대체하지 않고, 기존 세트에 업데이트한다.
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size > 0) {
          // 처음으로 화면에 보이는 heading의 id를 activeId로 설정한다.
          const topMost = headings.find((heading) => visible.has(heading.id));
          if (topMost) setActiveId(topMost.id);
        }
      },
      // 화면 상단 20%만 관찰
      { rootMargin: "0% 0% -80% 0%" },
    );

    // start watching every heading for intersection changes.
    for (const heading of headings) observer.observe(heading);

    return () => observer.disconnect();
  }, [hrefs]);

  return activeId;
}
