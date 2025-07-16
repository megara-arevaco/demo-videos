import { Link } from "@tanstack/react-router";

export function Navigation() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-lg font-semibold">
              Video Demo
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary"
            >
              Videos
            </Link>
            <Link
              to="/upload"
              className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary"
            >
              Upload
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
