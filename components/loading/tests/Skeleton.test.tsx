import { render } from "@testing-library/react";

import { Skeleton } from "@/Skeleton";

describe("Skeleton", () => {
  it("renders the default Skeleton correctly", () => {
    const { getByTestId } = render(<Skeleton data-testid="skeleton" />);

    const skeleton = getByTestId("skeleton");
    expect(skeleton.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders circlular Skeleton correctly", () => {
    const { getByTestId } = render(
      <Skeleton circle width={64} height={10} data-testid="skeleton" />,
    );

    const skeleton = getByTestId("skeleton");
    // Check if the skeleton has circular shape
    expect(skeleton.style.width).toBe("64px");
    expect(skeleton.style.height).toBe("64px");
  });

  it("renders Skeleton with multiple lines correctly", () => {
    const { getByTestId } = render(
      <Skeleton lines={3} data-testid="skeleton" />,
    );

    const skeleton = getByTestId("skeleton");
    const lines = skeleton.querySelectorAll("div");
    expect(lines.length).toBe(3);
  });

  it("respects width and height over styles", () => {
    const { getByTestId } = render(
      <Skeleton
        width={100}
        height={50}
        style={{ width: "200px", height: "200px" }}
        data-testid="skeleton"
      />,
    );

    const skeleton = getByTestId("skeleton");
    expect(skeleton.style.width).toBe("100px");
    expect(skeleton.style.height).toBe("50px");
  });
});
