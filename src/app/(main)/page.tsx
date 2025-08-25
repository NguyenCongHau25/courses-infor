// Home page
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpenCheck, Users, Search } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Phần Hero Section */}
      <main className="container mx-auto px-4">
        <section className="text-center py-20 sm:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Tìm kiếm thông tin môn học
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-8">
            Tra cứu đề cương, tài liệu, và đánh giá giáo viên một cách dễ dàng và trực quan.
          </p>
          
          {/* Thanh tìm kiếm chính */}
          <div className="max-w-xl mx-auto mb-8">
            <SearchBar placeholder="Nhập tên hoặc mã môn học..."/>
          </div>
          
          {/* Nút Call-to-action */}
          <Button size="lg" asChild>
            <Link href="/courses">Xem tất cả môn học</Link>
          </Button>
        </section>
      </main>

      {/* Phần Giới thiệu tính năng */}
      <section className="bg-slate-50 border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tra cứu nhanh</h3>
              <p className="text-slate-500">
                Tìm kiếm thông tin môn học, mã môn, hoặc tên giảng viên chỉ trong vài giây.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <BookOpenCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tài liệu tập trung</h3>
              <p className="text-slate-500">
                Tất cả slide, đề thi, tài liệu tham khảo được tổng hợp tại một nơi duy nhất.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Đánh giá khách quan</h3>
              <p className="text-slate-500">
                Xem và đóng góp các đánh giá về giáo viên để giúp cộng đồng học tập tốt hơn.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}