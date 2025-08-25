import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { MOCK_COURSES } from "@/lib/mockdata";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, Users } from "lucide-react";

export default function CoursesPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';
  
  // Logic tìm kiếm vẫn giữ nguyên
  const filteredCourses = query 
    ? MOCK_COURSES.filter(course => 
        course.name.toLowerCase().includes(query.toLowerCase()) || 
        course.code.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_COURSES;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold">Danh sách Môn học</h1>
        <div className="w-full sm:w-auto sm:max-w-xs">
          <SearchBar placeholder="Tìm kiếm trong danh sách..." />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Mã MH</TableHead>
              <TableHead>Tên môn học</TableHead>
              <TableHead className="hidden md:table-cell text-center">Giáo viên</TableHead>
              <TableHead className="hidden md:table-cell text-center">Tài liệu</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Users className="h-4 w-4 text-slate-500"/>
                        {course.teachers.length}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                     <div className="flex items-center justify-center gap-2">
                        <BookOpen className="h-4 w-4 text-slate-500"/>
                        {course.documents.length}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/courses/${course.id}`}>Xem chi tiết</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Không tìm thấy môn học nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}