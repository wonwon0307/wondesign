import { render } from "@testing-library/react";

import { IconPreview } from "@/widgets/preview";

vi.mock("@wondesign/ui/icons", () => ({
  AppIcon: () => <div>AppIcon</div>,
}));

describe("IconPreview", () => {
  it("renders <IconPreview> correctly", () => {
    const { getAllByText } = render(<IconPreview />);

    expect(getAllByText("AppIcon")).toHaveLength(26);
  });
});
