"use client";

import type React from "react";

import { Sidebar, MobileSidebar } from "@/components/shared/sidebar";
import useStore from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const router = useRouter();
  const token = useStore((state) => state.token);
  useEffect(() => {
    if (token === "") {
      router.push("/login");
    }
  }, []);
  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 border-b md:hidden">
          <div className="flex items-center gap-2">
            <MobileSidebar />
            {title && <h1 className="font-semibold text-lg">{title}</h1>}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
