import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-800">
          UIT - CoursesInfo
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <Link href="/courses" className="hover:text-primary transition-colors">Môn học</Link>
          <Link href='/teachers' className="hover:text-primary transition-colors"> Giảng viên</Link>
          {/* Link TKB sẽ là link ngoài */}
          <a 
            href="https://dkhp-uit.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Tool ĐKHP
          </a>
        </nav>
        <div className="flex items-center gap-2">
           <Button variant="outline" asChild>
            <Link href="/admin">Admin Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}