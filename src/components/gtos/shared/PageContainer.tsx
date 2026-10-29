"use client";

import { cn } from "@/lib/utils";

export function PageContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function PageCard({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card/40",
        padded && "p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PageGrid({ children, cols = 3 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) {
  const colMap = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  };
  return <div className={cn("grid gap-4 sm:grid-cols-2", colMap[cols])}>{children}</div>;
}
