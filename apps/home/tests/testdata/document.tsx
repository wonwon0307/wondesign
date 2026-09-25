import { DocsTocEntry } from "@wondocs/core/pages";

export const testPageComponent = () =>
  Promise.resolve({
    default: () => <div data-testid="page-content">Example Page Content</div>,
  });
const emptyPageComponent = () =>
  Promise.resolve({
    default: () => null,
  });
const testTOC: DocsTocEntry[] = [
  {
    href: "#section-1",
    depth: 1,
    value: "Section 1",
    numbering: [1],
    parent: "root",
  },
  {
    href: "#section-2",
    depth: 1,
    value: "Section 2",
    numbering: [2],
    parent: "root",
  },
];

export const testPageData = {
  normal: {
    component: testPageComponent,
    meta: {
      title: "Example Page Title",
      description: "Example Page Description",
    },
    toc: testTOC,
  },
  withTabs: {
    component: emptyPageComponent,
    meta: {
      title: "Example Page Title with Tabs",
      description: "Example Page Description with Tabs",
      type: "tabs",
    },
    toc: [],
  },
  tab: {
    component: testPageComponent,
    meta: null,
    toc: testTOC,
  },
};

export const testPageChildrenData = [
  {
    url: "/test-collection/test-slug/overview",
    component: testPageComponent,
    meta: null,
    toc: testTOC,
  },
  {
    url: "/test-collection/test-slug/api",
    component: testPageComponent,
    meta: null,
    toc: testTOC,
  },
];
