import { render } from "@testing-library/react";

import { Badge } from "@/Badge";

describe("Badge", () => {
  it("renders the badge with correct label and default properties", () => {
    const { getByTestId, getByText } = render(
      <Badge label="Test Badge" data-testid="badge" />,
    );

    expect(getByText("Test Badge")).toBeTruthy();

    const badgeElement = getByTestId("badge");
    expect(badgeElement.style.backgroundColor).toContain("color-mix");
    expect(badgeElement.style.backgroundColor).toContain("transparent");
  });

  it("applies the correct color and backgroundColor", () => {
    const { getByTestId, getByText } = render(
      <Badge
        label="Colored Badge"
        color="blue"
        backgroundColor="lightblue"
        data-testid="badge"
      />,
    );

    const label = getByText("Colored Badge");
    expect(label).toBeTruthy();
    expect(label.style.color).toBe("blue");

    const badgeElement = getByTestId("badge");
    expect(badgeElement.style.backgroundColor).toBe("lightblue");
  });

  it("renders correctly with left and right properties", () => {
    const { getByText } = render(
      <Badge
        label="Badge with Icons"
        left={<span>Left</span>}
        right={<span>Right</span>}
      />,
    );

    expect(getByText("Badge with Icons")).toBeTruthy();
    expect(getByText("Left")).toBeTruthy();
    expect(getByText("Right")).toBeTruthy();
  });
});
