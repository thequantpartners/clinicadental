import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-card w-full rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 border border-gray-50 ${className}`}>
      {children}
    </div>
  );
}
