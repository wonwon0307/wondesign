import { render } from "@testing-library/react";

import { Tooltip } from "@/Tooltip";

describe("Tooltip", () => {
  describe("simple tooltip", () => {
    it("renders a simple tooltip correctly", () => {
      const { getByText } = render(
        <Tooltip text="Tooltip text" unmountOnHide={false}>
          Hover me
        </Tooltip>,
      );

      expect(getByText("Hover me")).toBeTruthy();
      expect(getByText("Tooltip text")).toBeTruthy();
      expect(document.querySelector("svg")).toBeTruthy();
    });

    it("renders non-string text correctly", () => {
      const { getByText } = render(
        <Tooltip
          text={<span style={{ color: "red" }}>Tooltip text</span>}
          unmountOnHide={false}
        >
          Hover me
        </Tooltip>,
      );

      expect(getByText("Hover me")).toBeTruthy();
      expect(getByText("Tooltip text")).toBeTruthy();
      expect(document.querySelector("svg")).toBeTruthy();
    });

    it("renders correctly with left and right content", () => {
      const { getByText } = render(
        <Tooltip
          text="Tooltip text"
          left={<span>Left</span>}
          right={<span>Right</span>}
          unmountOnHide={false}
        >
          Hover me
        </Tooltip>,
      );

      expect(getByText("Left")).toBeTruthy();
      expect(getByText("Tooltip text")).toBeTruthy();
      expect(getByText("Right")).toBeTruthy();
    });

    it("renders correctly without the arrow", () => {
      const { getByText } = render(
        <Tooltip text="Tooltip text" unmountOnHide={false} hideArrow>
          Hover me
        </Tooltip>,
      );

      expect(getByText("Tooltip text")).toBeTruthy();
      expect(document.querySelector("svg")).toBeFalsy();
    });
  });

  describe("tooltip using content (escape hatch)", () => {
    it("renders correctly with string text", () => {
      const Content = () => <div>Tooltip text</div>;

      const { getByText } = render(
        <Tooltip unmountOnHide={false} content={<Content />}>
          Hover me
        </Tooltip>,
      );

      expect(getByText("Tooltip text")).toBeTruthy();
    });
  });

  it("warns on console if neither `content` nor `text` is provided", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<Tooltip unmountOnHide={false}>Hover me</Tooltip>);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[WonDesign] Tooltip: You must provide either `content` or `text` prop to render the tooltip content.",
    );

    consoleWarnSpy.mockRestore();
  });
});
