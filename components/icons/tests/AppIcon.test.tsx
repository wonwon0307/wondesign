import { render } from "@testing-library/react";

import { AppIcon } from "@/AppIcon";
import { iconMap, type IconName } from "@/iconMap";

describe("AppIcon", () => {
  const iconNames = Object.keys(iconMap) as IconName[];

  it("should render all icons correctly (default props)", () => {
    const { container } = render(
      <>
        {iconNames.map((icon) => (
          <AppIcon key={icon} icon={icon} />
        ))}
      </>,
    );
    const icon = container.querySelectorAll("svg");
    expect(icon.length).toBe(iconNames.length);
  });

  it("should throw an error for unsupported icon types", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    // @ts-expect-error: Testing invalid icon type
    render(<AppIcon icon="invalid-icon" />);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[WonDesign Icons] Icon not found: invalid-icon",
    );
    consoleWarnSpy.mockRestore();
  });

  it("should handle aria attributes correctly", () => {
    const { getByTestId } = render(
      <>
        <AppIcon icon="alert" aria-label="Alert" data-testid="icon" />
        <AppIcon
          icon="bell"
          aria-labelledby="icon-label"
          data-testid="labelled-icon"
        />
        <AppIcon icon="check" data-testid="hidden-icon" />
        <AppIcon icon="copy" aria-hidden={false} data-testid="visible-icon" />
      </>,
    );

    expect(getByTestId("icon").getAttribute("aria-label")).toBe("Alert");
    expect(getByTestId("icon").getAttribute("aria-hidden")).toBeNull();
    expect(getByTestId("labelled-icon").getAttribute("aria-labelledby")).toBe(
      "icon-label",
    );
    expect(getByTestId("labelled-icon").getAttribute("aria-hidden")).toBeNull();
    expect(getByTestId("hidden-icon").getAttribute("aria-hidden")).toBe("true");
    expect(getByTestId("visible-icon").getAttribute("aria-hidden")).toBe(
      "false",
    );
  });
});
