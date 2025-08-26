import { notFound } from "next/navigation";
import { MOCK_COURSES, MOCK_TEACHERS } from "@/lib/mockdata";
import { UserCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function TeacherDetailPage({ params }: { params: { teacherId: string } }) {
  const teacher = MOCK_TEACHERS.find(t => t.id === params.teacherId);

  if (!teacher) {
    notFound();
  }

  const coursesTaught = MOCK_COURSES.filter(course =>
    course.teachers.some(t => t.id === teacher.id)
  );

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        {/* Phần thông tin giảng viên */}
        <section className="mb-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="bg-white border rounded-full p-2">
            <UserCircle2 className="h-24 w-24 text-slate-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{teacher.name}</h1>
            <p className="mt-2 text-lg text-slate-600">
              Khoa phụ trách: <span className="font-semibold">{teacher.faculty || 'Chưa cập nhật'}</span>
            </p>
          </div>
        </section>
        
        <Separator />

        {/* Phần danh sách môn học dạng bảng */}
        <section className="mt-10">
          <h2 className="text-3xl font-semibold mb-6">Các môn học tham gia giảng dạy</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã môn học</TableHead>
                  <TableHead className="w-[30%]">Tên môn học</TableHead>
                  <TableHead>Khoa phụ trách</TableHead>
                  <TableHead>Nhóm môn học</TableHead>
                  <TableHead className="text-center">Số tài liệu</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* ----- ĐÂY LÀ PHẦN SỬA LỖI QUAN TRỌNG NHẤT ----- */}
                {coursesTaught.length > 0 ? (
                  // Nếu có dữ liệu, render các hàng bình thường
                  coursesTaught.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-mono font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.faculty || 'N/A'}</TableCell>
                      <TableCell>{course.category || 'N/A'}</TableCell>
                      <TableCell className="text-center">{course.documents.length}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/courses/${course.id}`}>Xem môn học</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Nếu KHÔNG có dữ liệu, render một hàng đặc biệt
                  // để giữ nguyên cấu trúc HTML của bảng
                  <TableRow>
                    <TableCell 
                      colSpan={6} // Chiếm đủ 6 cột
                      className="h-24 text-center"
                    >
                      Giảng viên này hiện chưa có thông tin về môn học giảng dạy.
                    </TableCell>
                  </TableRow>
                )}
                {/* ----- KẾT THÚC PHẦN SỬA LỖI ----- */}
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>
    </div>
  );
}