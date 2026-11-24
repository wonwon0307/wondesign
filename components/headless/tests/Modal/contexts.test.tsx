import { render } from "@testing-library/react";

import { ModalProvider } from "@/Modal/Provider";
import { ModalBackdrop } from "@/Modal/Backdrop";
import { ModalContent } from "@/Modal/Content";
import { ModalTitle } from "@/Modal/Title";
import { ModalClose } from "@/Modal/Close";
import { ModalTrigger } from "@/Modal/Trigger";
import { useModal } from "@/Modal/contexts";

describe("Modal - contexts", () => {
  it("calls useModal inside the provider", () => {
    const TestComponent = () => {
      const context = useModal();
      return <div>{context ? "has context" : "no context"}</div>;
    };

    const { getByText } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    expect(getByText("has context")).toBeTruthy();
  });

  it("should raise an error if Modal components are used outside of the provider", () => {
    const errMsg =
      "[WonDesign Headless] useModal() must be used inside a Modal Provider.";
    expect(() => render(<ModalBackdrop />)).toThrow();

    expect(() => render(<ModalContent>Content</ModalContent>)).toThrow(errMsg);

    expect(() => render(<ModalTitle>Title</ModalTitle>)).toThrow(errMsg);

    expect(() => render(<ModalClose>Close</ModalClose>)).toThrow(errMsg);

    expect(() => render(<ModalTrigger>Open Modal</ModalTrigger>)).toThrow(
      errMsg,
    );
  });

  it("should raise an error if ModalTitle or ModalClose are used outside of the provider", () => {
    expect(() =>
      render(
        <ModalProvider>
          <ModalTitle>Title</ModalTitle>
        </ModalProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] ModalTitle must be used inside a ModalContent.",
    );
    expect(() =>
      render(
        <ModalProvider>
          <ModalClose>Close</ModalClose>
        </ModalProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] ModalClose must be used inside a ModalContent.",
    );
  });

  it("should warn on console if ModalTrigger or ModalBackdrop are used inside ModelContent", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "development");

    render(
      <ModalProvider isOpen>
        <ModalContent>
          <ModalBackdrop />
          <ModalTrigger>Open Modal</ModalTrigger>
        </ModalContent>
      </ModalProvider>,
    );

    expect(console.warn).toHaveBeenNthCalledWith(
      1,
      "[WonDesign Headless] ModalBackdrop should be rendered outside of ModalContent.",
    );
    expect(console.warn).toHaveBeenLastCalledWith(
      "[WonDesign Headless] ModalTrigger should be rendered outside of ModalContent and ModalBackdrop.",
    );

    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });
});
