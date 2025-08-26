"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; 

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO với 2 màu */}
        <Link href="/" className="text-xl font-bold">
          <span className="text-blue-600">UIT - </span>
          <span className="text-blue-600">CoursesInfo</span>
        </Link>

        {/* NAV VỚI STYLE ACTIVE TAB */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              "py-1 transition-colors border-b-2",
              pathname === "/"
                ? "text-blue-600 border-blue-600"
                : "text-slate-800 border-transparent hover:text-blue-600"
            )}
          >
            Trang chủ
          </Link>
          <Link
            href="/courses"
            className={cn(
              "py-1 transition-colors border-b-2",
              pathname === "/courses"
                ? "text-blue-600 border-blue-600"
                : "text-slate-800 border-transparent hover:text-blue-600"
            )}
          >
            Môn học
          </Link>
          <Link
            href="/teachers"
            className={cn(
              "py-1 transition-colors border-b-2",
              pathname === "/teachers"
                ? "text-blue-600 border-blue-600"
                : "text-slate-800 border-transparent hover:text-blue-600"
            )}
          >
            Giảng viên
          </Link>

          {/* Link ngoài sẽ có style như tab không active */}
          <a
            href="https://dkhp-uit.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="py-1 text-slate-800 border-b-2 border-transparent hover:text-blue-600 transition-colors"
          >
            Tool ĐKHP
          </a>
        </nav>

        {/* Nút Admin Login giữ nguyên */}
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin">Admin Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
