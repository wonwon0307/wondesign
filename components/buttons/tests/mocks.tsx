vi.mock("@wondesign/icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));
vi.mock("@wondesign/loading/Spinner", () => ({
  Spinner: () => <span data-testid="spinner">Spinner</span>,
}));
