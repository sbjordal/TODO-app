// app/dashboard/layout.tsx
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  );
}
 