import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { UploadForm } from "./UploadForm";

describe("UploadForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("should render all form fields and submit button", () => {
    render(<UploadForm isUploading={false} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/video file/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /upload video/i })
    ).toBeInTheDocument();
  });

  it("should show validation errors if required fields are empty", async () => {
    render(<UploadForm isUploading={false} onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /upload video/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/at least one tag is required/i)
    ).toBeInTheDocument();

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should disable inputs and button when isUploading is true", () => {
    render(<UploadForm isUploading={true} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/video file/i)).toBeDisabled();
    expect(screen.getByLabelText(/title/i)).toBeDisabled();
    expect(screen.getByLabelText(/tags/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /uploading/i })).toBeDisabled();
  });
});
