'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookCopy, Users, LogOut, FileText, MessageSquare } from "lucide-react"; // Thêm icon
import { cn } from "@/lib/utils"; // shadcn/ui auto-generates this util file

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/courses", label: "Quản lý Môn học", icon: BookCopy },
    { href: "/admin/teachers", label: "Quản lý Giảng viên", icon: Users },
    { href: "/admin/documents", label: "Quản lý Tài liệu", icon: FileText }, // Thêm dòng này
    { href: "/admin/reviews", label: "Quản lý Đánh giá", icon: MessageSquare }, // Thêm dòng này
];

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="">Admin</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
            <Link 
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Link>
        </div>
      </div>
    </div>
  );
}