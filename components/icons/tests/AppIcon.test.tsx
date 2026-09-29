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
});
