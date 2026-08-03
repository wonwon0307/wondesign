import { act, fireEvent, render, waitFor } from "@testing-library/react";

import { Popover } from "@/components/Popover";
import { TestComponent } from "./_setup";

describe("Popover - corner cases", () => {
  describe("Async Button Actions", () => {
    let promise!: () => void;

    const AsyncTestComponent = ({
      onClose,
    }: {
      onClose: () => Promise<void>;
    }) => {
      return (
        <Popover>
          <Popover.Trigger data-testid="popover-trigger">
            트리거
          </Popover.Trigger>
          <Popover.Content data-testid="popover-content">
            <Popover.Close onClick={onClose} data-testid="popover-button">
              닫기
            </Popover.Close>
          </Popover.Content>
        </Popover>
      );
    };

    it("stays open while pending and sets correct properties", async () => {
      const onClose = () =>
        new Promise<void>((resolve) => {
          promise = resolve;
        });
      const { getByTestId } = render(<AsyncTestComponent onClose={onClose} />);

      const content = getByTestId("popover-content");

      fireEvent.click(getByTestId("popover-trigger"));
      expect(content.dataset.state).toBe("open");

      const button = getByTestId("popover-button");
      fireEvent.click(button);

      // 버튼이 pending 상태일 때, Popover.Content가 닫히면 안 된다.
      expect(content.dataset.state).toBe("open");

      // 버튼에 pending 속성이 true로 설정되어야 한다.
      expect(content.getAttribute("aria-busy")).toBe("true");

      await act(async () => {
        promise();
      });

      // Promise가 해결된 후, Popover.Content가 닫혀야 한다.
      await waitFor(() => expect(content.dataset.state).toBe("closed"));
    });

    it("closes on resolve", async () => {
      const onClose = () =>
        new Promise<void>((resolve) => {
          promise = resolve;
        });
      const { getByTestId } = render(<AsyncTestComponent onClose={onClose} />);

      fireEvent.click(getByTestId("popover-trigger"));
      const content = getByTestId("popover-content");
      expect(content.dataset.state).toBe("open");

      fireEvent.click(getByTestId("popover-button"));

      await act(async () => {
        promise();
      });

      await waitFor(() => expect(content.dataset.state).toBe("closed"));
    });

    it("stays open on reject", async () => {
      const onClose = () => Promise.reject(new Error("실패"));
      const { getByTestId } = render(<AsyncTestComponent onClose={onClose} />);

      const content = getByTestId("popover-content");

      fireEvent.click(getByTestId("popover-trigger"));
      expect(content.dataset.state).toBe("open");

      fireEvent.click(getByTestId("popover-button"));

      await waitFor(() => {
        // Promise가 거부된 후에도 Popover.Content가 닫히면 안 된다.
        expect(content.dataset.state).toBe("open");

        // Popover.Content에 pending 관련 속성이 올바르게 설정되어야 한다.
        expect(content.getAttribute("aria-busy")).toBe("false");
      });
    });
  });

  describe("unmountOnHide behavior", () => {
    it("does not render content when closed if unmountOnHide is true", () => {
      const { queryByTestId } = render(
        <TestComponent unmountOnHide>Test Popover</TestComponent>,
      );

      expect(queryByTestId("popover-content")).toBeNull();
    });
  });
});
