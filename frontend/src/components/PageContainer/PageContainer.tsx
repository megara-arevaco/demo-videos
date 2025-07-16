type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return <div className={`w-full ${className}`}>{children}</div>;
}
