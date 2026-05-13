import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="pt-24 px-6 fade-in min-h-screen">
      {children}
    </div>
  );
}
