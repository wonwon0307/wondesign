import { fireEvent, render } from "@testing-library/react";

import { Alerter } from "@/Alerter";
import { showAlert, showConfirm } from "@/api";

describe("Alerter - Button Text tests", () => {
  it("renders with default texts correctly", () => {
    const { getByText, queryByText } = render(
      <div>
        <Alerter />
        <button onClick={() => showAlert("Test Alert", "This is a test alert")}>
          Show Alert
        </button>
        <button
          onClick={() => showConfirm("Test Confirm", "This is a test confirm")}
        >
          Show Confirm
        </button>
      </div>,
    );

    // 초기에는 아무것도 안보여야한다
    expect(queryByText("Test Alert")).toBeNull();
    expect(queryByText("Test Confirm")).toBeNull();

    // Alert 버튼 클릭 시 Alert가 보여야 한다
    fireEvent.click(getByText("Show Alert"));
    expect(getByText("Close")).toBeTruthy();

    // dismiss
    fireEvent.click(getByText("Close"));
    expect(queryByText("Test Alert")).toBeNull();

    // Confirm 버튼 클릭 시 Confirm이 보여야 한다
    fireEvent.click(getByText("Show Confirm"));
    expect(getByText("Cancel")).toBeTruthy();
    expect(getByText("OK")).toBeTruthy();

    // dismiss
    fireEvent.click(getByText("Cancel"));
    expect(queryByText("Test Confirm")).toBeNull();
  });

  it("respects alerter-wide default texts", () => {
    const { getByText, queryByText } = render(
      <div>
        <Alerter cancelText="취소" closeText="닫기" confirmText="확인" />
        <button onClick={() => showAlert("Test Alert", "This is a test alert")}>
          Show Alert
        </button>
        <button
          onClick={() => showConfirm("Test Confirm", "This is a test confirm")}
        >
          Show Confirm
        </button>
      </div>,
    );

    fireEvent.click(getByText("Show Alert"));
    expect(queryByText("Close")).toBeNull();
    expect(getByText("닫기")).toBeTruthy();
    fireEvent.click(getByText("닫기"));
    expect(queryByText("Test Alert")).toBeNull();

    fireEvent.click(getByText("Show Confirm"));
    expect(queryByText("Cancel")).toBeNull();
    expect(queryByText("OK")).toBeNull();
    expect(getByText("취소")).toBeTruthy();
    expect(getByText("확인")).toBeTruthy();
    fireEvent.click(getByText("취소"));
    expect(queryByText("Test Confirm")).toBeNull();
  });

  it("respects per-alert override texts", () => {
    const { getByText, queryByText } = render(
      <div>
        <Alerter />
        <button
          onClick={() =>
            showAlert("Test Alert", "This is a test alert", {
              closeText: "Quit",
            })
          }
        >
          Show Alert
        </button>
        <button
          onClick={() =>
            showConfirm("Test Confirm", "This is a test confirm", {
              cancelText: "Back",
              confirmText: "Delete",
              isDestructive: true,
            })
          }
        >
          Show Confirm
        </button>
      </div>,
    );

    fireEvent.click(getByText("Show Alert"));
    expect(queryByText("Close")).toBeNull();
    expect(getByText("Quit")).toBeTruthy();
    fireEvent.click(getByText("Quit"));
    expect(queryByText("Test Alert")).toBeNull();

    fireEvent.click(getByText("Show Confirm"));
    expect(queryByText("Cancel")).toBeNull();
    expect(queryByText("OK")).toBeNull();
    expect(getByText("Back")).toBeTruthy();
    expect(getByText("Delete")).toBeTruthy();
    fireEvent.click(getByText("Back"));
    expect(queryByText("Test Confirm")).toBeNull();
  });
});
