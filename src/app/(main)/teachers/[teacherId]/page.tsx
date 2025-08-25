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
            <UserCircle2 className="h-12 w-12 text-slate-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{teacher.name}</h1>
            <p className="mt-2 text-lg text-slate-600">
              Thông tin chi tiết, học vị, và các thành tích của giảng viên sẽ được cập nhật tại đây.
            </p>
          </div>
        </section>
        
        <Separator />

        {/* Phần danh sách môn học dạng bảng */}
        <section className="mt-10">
          <h2 className="text-3xl font-semibold mb-6">Các môn học tham gia giảng dạy</h2>
          {coursesTaught.length > 0 ? (
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã môn học</TableHead>
                    <TableHead className="w-[50%]">Tên môn học</TableHead>
                    <TableHead>Số tài liệu</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coursesTaught.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-mono">{course.code}</TableCell>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.documents.length}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/courses/${course.id}`}>Xem môn học</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-slate-500 bg-slate-100 p-8 rounded-md">
              Chưa có thông tin về môn học của giảng viên này.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}