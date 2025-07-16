import { describe, it, expect } from "vitest";
import { UploadVideoSchema } from "./uploadVideoSchema";

describe("UploadVideoSchema (Vitest)", () => {
  it("should reject video with empty title", () => {
    const result = UploadVideoSchema.safeParse({
      title: "",
      tags: "tag1",
      file: "test.mp4",
    });
    expect(result.success).toBe(false);
  });

  it("should reject video with empty tags", () => {
    const result = UploadVideoSchema.safeParse({
      title: "Test",
      tags: "",
      file: "test.mp4",
    });
    expect(result.success).toBe(false);
  });

  it("should reject video with only whitespace tags", () => {
    const result = UploadVideoSchema.safeParse({
      title: "Test",
      tags: "   ",
      file: "test.mp4",
    });
    expect(result.success).toBe(false);
  });

  it("should accept video with valid title and tags", () => {
    const result = UploadVideoSchema.safeParse({
      title: "Test",
      tags: "tag1, tag2",
      file: "test.mp4",
    });
    expect(result.success).toBe(true);
  });
});
