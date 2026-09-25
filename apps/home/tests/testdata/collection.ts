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
