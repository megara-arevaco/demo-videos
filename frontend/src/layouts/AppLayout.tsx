import { Navigation } from "../components/Navigation/Navigation";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
}
