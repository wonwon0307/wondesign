import { render } from "@testing-library/react";

import { Badge } from "@/Badge";

describe("Badge", () => {
  it("renders the badge with correct label and default properties", () => {
    const { getByTestId, getByText } = render(
      <Badge label="Test Badge" data-testid="badge" />,
    );

    const label = getByText("Test Badge");
    expect(label).toBeTruthy();
    expect(label.style.color).toBe("gray");

    const badgeElement = getByTestId("badge");
    expect(badgeElement.style.backgroundColor).toBe(
      "color-mix(in srgb, gray 25%, light-dark(rgb(255, 255, 255), rgb(0, 0, 0)))",
    );
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
