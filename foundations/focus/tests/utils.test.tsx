import { render } from "@testing-library/react";

import { getFocusableElements } from "@/utils";

function getTestIds(container: HTMLElement) {
  return getFocusableElements(container).map(
    (element) => element.dataset.testid,
  );
}

describe("getFocusableElements", () => {
  it("collects focusable elements in document order", () => {
    const { getByTestId } = render(
      <div data-testid="container">
        <a href="#" data-testid="link" />
        <button data-testid="button" />
        <input data-testid="input" />
        <select data-testid="select" />
        <textarea data-testid="textarea" />
        <div contentEditable data-testid="editable" />
        <details>
          <summary data-testid="summary">Summary</summary>
        </details>
        <div tabIndex={0} data-testid="tabindex" />
      </div>,
    );

    expect(getTestIds(getByTestId("container"))).toEqual([
      "link",
      "button",
      "input",
      "select",
      "textarea",
      "editable",
      "summary",
      "tabindex",
    ]);
  });

  it("skips elements that can't be focused", () => {
    const { getByTestId } = render(
      <div data-testid="container">
        <a data-testid="link-without-href" />
        <button disabled data-testid="disabled-button" />
        <button disabled tabIndex={0} data-testid="disabled-tabindex" />
        <input type="hidden" data-testid="hidden-input" />
        <fieldset disabled>
          <input data-testid="fieldset-input" />
        </fieldset>
        <div contentEditable="false" data-testid="not-editable" />
        <button data-testid="button" />
      </div>,
    );

    expect(getTestIds(getByTestId("container"))).toEqual(["button"]);
  });

  it("skips elements removed from the tab order", () => {
    const { getByTestId } = render(
      <div data-testid="container">
        <button tabIndex={-1} data-testid="minus-one" />
        <a href="#" tabIndex={-2} data-testid="minus-two" />
        <button data-testid="button" />
      </div>,
    );

    expect(getTestIds(getByTestId("container"))).toEqual(["button"]);
  });

  it("skips hidden and inert elements", () => {
    const { getByTestId } = render(
      <div data-testid="container">
        <button hidden data-testid="hidden" />
        <div style={{ display: "none" }}>
          <button data-testid="display-none" />
        </div>
        <div style={{ visibility: "hidden" }}>
          <button data-testid="visibility-hidden" />
        </div>
        <div inert>
          <button data-testid="inert" />
        </div>
        <button data-testid="button" />
      </div>,
    );

    expect(getTestIds(getByTestId("container"))).toEqual(["button"]);
  });

  it("uses checkVisibility when the browser supports it", () => {
    const checkVisibility = vi.fn(function (this: HTMLElement) {
      return this.dataset.testid !== "invisible";
    });
    HTMLElement.prototype.checkVisibility = checkVisibility;

    const { getByTestId } = render(
      <div data-testid="container">
        <button data-testid="invisible" />
        <button data-testid="button" />
      </div>,
    );

    expect(getTestIds(getByTestId("container"))).toEqual(["button"]);
    expect(checkVisibility).toHaveBeenCalledWith({ visibilityProperty: true });

    // @ts-expect-error -- jsdom doesn't implement checkVisibility
    delete HTMLElement.prototype.checkVisibility;
  });
});
