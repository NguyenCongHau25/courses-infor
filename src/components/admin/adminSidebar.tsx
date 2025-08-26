'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookCopy, Users, LogOut, FileText, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/courses", label: "Quản lý Môn học", icon: BookCopy },
    { href: "/admin/teachers", label: "Quản lý Giảng viên", icon: Users },
    { href: "/admin/documents", label: "Quản lý Tài liệu", icon: FileText },
    { href: "/admin/reviews", label: "Quản lý Đánh giá", icon: MessageSquare },
  ];

  return (
    <div className={cn(
      "hidden border-r bg-background md:block transition-all duration-200",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className={cn(
          "flex items-center border-b px-4 lg:h-[60px] lg:px-6",
          collapsed ? "justify-center h-14" : "justify-between h-14"
        )}>
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <Home className="h-5 w-5" />
            {!collapsed && <span>Admin</span>}
          </Link>
          <button
            className={cn(
              "ml-auto p-1 rounded hover:bg-muted transition",
              collapsed ? "" : "ml-2"
            )}
            onClick={() => setCollapsed(v => !v)}
            aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex-1">
          <nav className={cn(
            "grid items-start text-sm font-medium",
            collapsed ? "px-1" : "px-2 lg:px-4"
          )}>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={cn(
          "mt-auto p-4 border-t",
          collapsed && "p-2"
        )}>
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && "Đăng xuất"}
          </Link>
        </div>
      </div>
    </div>
  );
}