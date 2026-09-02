import React from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function DashboardRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="STUDENT">
      {children}
    </DashboardLayout>
  )
}