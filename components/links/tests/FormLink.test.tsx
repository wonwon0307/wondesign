import { render } from "@testing-library/react";

import { FormLink } from "@/FormLink/FormLink";

describe("FormLink", () => {
  it("renders all variants correctly", () => {
    const { getByText } = render(
      <>
        <FormLink>Signup</FormLink>
        <FormLink outlined>Outlined Signup</FormLink>
        <FormLink variant="secondary">Back</FormLink>
        <FormLink variant="secondary" outlined>
          Outlined Back
        </FormLink>
        <FormLink variant="destructive">Withdraw</FormLink>
        <FormLink variant="destructive" outlined>
          Outlined Withdraw
        </FormLink>
      </>,
    );

    const signup = getByText("Signup");
    expect(signup.className).toContain("primary-filled");

    const outlinedSignup = getByText("Outlined Signup");
    expect(outlinedSignup.className).toContain("primary-outlined");

    const back = getByText("Back");
    expect(back.className).toContain("secondary-filled");

    const outlinedBack = getByText("Outlined Back");
    expect(outlinedBack.className).toContain("secondary-outlined");

    const withdraw = getByText("Withdraw");
    expect(withdraw.className).toContain("destructive-filled");

    const withdrawButton = getByText("Outlined Withdraw");
    expect(withdrawButton.className).toContain("destructive-outlined");
  });
});
