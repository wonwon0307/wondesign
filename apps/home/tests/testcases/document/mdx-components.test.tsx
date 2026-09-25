import { render } from "@testing-library/react";

import { mdxComponents } from "@/pages/document/ui/mdx";

describe("MDX Components", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("maps h1-h4 to the matching heading tag", () => {
    const { getByText } = render(
      <>
        <mdxComponents.h1>Heading 1</mdxComponents.h1>
        <mdxComponents.h2>Heading 2</mdxComponents.h2>
        <mdxComponents.h3>Heading 3</mdxComponents.h3>
        <mdxComponents.h4>Heading 4</mdxComponents.h4>
      </>,
    );

    expect(getByText("Heading 1").tagName).toBe("H1");
    expect(getByText("Heading 2").tagName).toBe("H2");
    expect(getByText("Heading 3").tagName).toBe("H3");
    expect(getByText("Heading 4").tagName).toBe("H4");
  });

  it("warns and falls back to h4 for h5 and h6 in development", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const { getByText } = render(
      <>
        <mdxComponents.h5>Heading 5</mdxComponents.h5>
        <mdxComponents.h6>Heading 6</mdxComponents.h6>
      </>,
    );

    expect(getByText("Heading 5").tagName).toBe("H4");
    expect(getByText("Heading 6").tagName).toBe("H4");
    expect(console.warn).toHaveBeenCalledWith(
      "h5 heading is not supported. rendering as h4 instead.",
    );
    expect(console.warn).toHaveBeenCalledWith(
      "h6 heading is not supported. rendering as h4 instead.",
    );
  });

  it("does not warn for h5 and h6 in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <>
        <mdxComponents.h5>Heading 5</mdxComponents.h5>
        <mdxComponents.h6>Heading 6</mdxComponents.h6>
      </>,
    );

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("renders the paragraph, link, and inline code components", () => {
    const { getByText } = render(
      <>
        <mdxComponents.p>Paragraph text</mdxComponents.p>
        <mdxComponents.a>Link text</mdxComponents.a>
        <mdxComponents.code>const x = 1;</mdxComponents.code>
      </>,
    );

    expect(getByText("Paragraph text").tagName).toBe("P");
    expect(getByText("Link text").tagName).toBe("A");
    expect(getByText("const x = 1;").tagName).toBe("CODE");
  });

  it("renders a code block using the child code element's content", () => {
    const { getByText } = render(
      <mdxComponents.pre>
        <code>{"console.log(1);"}</code>
      </mdxComponents.pre>,
    );

    expect(getByText("console.log(1);")).toBeTruthy();
  });
});
