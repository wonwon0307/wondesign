import * as fs from "node:fs/promises";

import { clean } from "@/lib/clean";

vi.mock("node:fs/promises", async () => {
  return {
    mkdir: vi.fn().mockResolvedValue(undefined),
    rm: vi.fn().mockResolvedValue(undefined),
  };
});
vi.unmock("@/lib/clean");

describe("clean", () => {
  it("should clean the directory", async () => {
    await clean("some/path");

    expect(fs.rm).toHaveBeenCalledWith(expect.stringContaining("some/path"), {
      recursive: true,
      force: true,
    });
  });

  it("should refuse to clean any directories outside the cwd", async () => {
    await expect(clean("../outside/path")).rejects.toThrow();
  });

  it("should throw an error if rm() fails", async () => {
    vi.mocked(fs.rm).mockRejectedValueOnce(new Error("rm failed"));
    await expect(clean("some/path")).rejects.toThrow("rm failed");
  });

  it("should throw an error if mkdir() fails", async () => {
    vi.mocked(fs.mkdir).mockRejectedValueOnce(new Error("mkdir failed"));
    await expect(clean("some/path")).rejects.toThrow("mkdir failed");
  });
});
