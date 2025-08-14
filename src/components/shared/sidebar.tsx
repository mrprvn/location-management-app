"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Upload, LogOut, Menu, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/lib/store";

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "Map",
    href: "/map",
    icon: Map,
  },
  {
    name: "File Upload",
    href: "/upload",
    icon: Upload,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const setToken = useStore((state) => state.setToken);
  const token = useStore((state) => state.token);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (token === "") {
      router.push("/login");
    }
  }, [token]);

  const handleLogout = () => {
    setToken("");
  };

  return (
    <div
      className={cn("flex h-full w-64 flex-col bg-card border-r", className)}
    >
      {/* Logo/Brand */}
      <div className="flex h-16 items-center px-6 border-b">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">LocationApp</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 cursor-pointer text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const setToken = useStore((state) => state.setToken);
  const pathname = usePathname();

  const handleLogout = () => {
    setToken("");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center px-6 border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">LocationApp</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
