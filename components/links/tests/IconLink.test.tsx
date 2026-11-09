import { render } from "@testing-library/react";

import { IconLink } from "@/IconLink/IconLink";

vi.mock("@wondesign/icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe("IconLink", () => {
  it("renders children mode correctly", () => {
    const { getByText } = render(
      <IconLink>
        <span>Icon</span>
      </IconLink>,
    );

    expect(getByText("Icon")).toBeTruthy();
  });

  it("renders icon mode correctly", () => {
    const { getByText } = render(<IconLink icon="check-fill" />);

    expect(getByText("check-fill")).toBeTruthy(); // mocked in line 5
  });

  it("renders all appearances correctly", () => {
    const { getByTestId } = render(
      <>
        <IconLink
          icon="check-circle"
          appearance="filled"
          data-testid="filled-link"
        />
        <IconLink
          icon="check-fill"
          appearance="outlined"
          data-testid="outlined-link"
        />
        <IconLink icon="check" appearance="ghost" data-testid="ghost-link" />
      </>,
    );

    expect(getByTestId("filled-link").className).toContain("filled");
    expect(getByTestId("outlined-link").className).toContain("outlined");
    expect(getByTestId("ghost-link").className).toContain("ghost");
  });

  it("renders icon link with props correctly", () => {
    const { getByTestId } = render(
      <IconLink
        icon="check-fill"
        size={32}
        rounded
        spacious
        data-testid="link"
      />,
    );

    expect(getByTestId("link").className).toContain("rounded");
    expect(getByTestId("link").className).toContain("spacious");
  });
});
