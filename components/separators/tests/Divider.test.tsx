import { render } from "@testing-library/react";

import { Divider } from "@/Divider/Divider";

describe("Divider", () => {
  it("renders different variants of dividers correctly", () => {
    const { getByTestId } = render(
      <>
        <Divider data-testid="default" />
        <Divider bold data-testid="bold" />
        <Divider label="Label" data-testid="with-label" />
        <Divider
          label="Label on start"
          labelAlign="start"
          data-testid="with-label-start"
        />
        <Divider
          label="Label on end"
          labelAlign="end"
          data-testid="with-label-end"
        />
        <Divider
          label={<span>Label Element</span>}
          data-testid="with-label-element"
        />
        <Divider vertical data-testid="vertical" />
      </>,
    );

    expect(getByTestId("default")).toBeTruthy();
    expect(getByTestId("bold")).toBeTruthy();
    expect(getByTestId("with-label")).toBeTruthy();
    expect(getByTestId("with-label-start")).toBeTruthy();
    expect(getByTestId("with-label-end")).toBeTruthy();
    expect(getByTestId("with-label-element")).toBeTruthy();
    expect(getByTestId("vertical")).toBeTruthy();
  });
});
