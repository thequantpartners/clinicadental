import { ReactNode } from "react";

export function Section({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section 
      id={id} 
      className={`h-full w-full snap-start snap-always flex flex-col justify-center items-center p-6 relative flex-shrink-0 ${className}`}
    >
      {children}
    </section>
  );
}
