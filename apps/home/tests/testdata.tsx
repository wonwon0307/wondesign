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
    url: "/test-slug/overview",
    component: testPageComponent,
    meta: null,
    toc: testTOC,
  },
  {
    url: "/test-slug/api",
    component: testPageComponent,
    meta: null,
    toc: testTOC,
  },
];

export const testSidebarItems = [
  {
    type: "link",
    label: "Test Link",
    url: "/test-link",
  },
  {
    type: "group",
    label: "Test Group",
    items: [
      {
        type: "link",
        label: "Nested Link 1",
        url: "/nested-link-1",
      },
      {
        type: "link",
        label: "Nested Link 2",
        url: "/nested-link-2",
        right: "Coming Soon",
      },
    ],
  },
  {
    type: "link",
    label: "Test Link 2",
    url: "/test-link-2",
    items: [
      {
        type: "link",
        label: "Nested Link 3",
        url: "/nested-link-3",
        right: "Internal",
      },
    ],
  },
];
