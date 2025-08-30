import Link from "next/link";
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

export default async function CoursesTable({
  searchParams,
}: {
  searchParams: { 
    query?: string;
    faculty?: string;
    category?: string;
  };
}) {
  const { query = '', faculty: facultyFilter = '', category: categoryFilter = '' } = searchParams;

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchQuery =
      !query ||
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.code.toLowerCase().includes(query.toLowerCase());
    
    const matchFaculty = !facultyFilter || course.faculty === facultyFilter;
    const matchCategory = !categoryFilter || course.category === categoryFilter;

    return matchQuery && matchFaculty && matchCategory;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Mã MH</TableHead>
            <TableHead>Tên môn học</TableHead>
            <TableHead>Khoa phụ trách</TableHead>
            <TableHead>Nhóm môn học</TableHead>
            <TableHead className="hidden md:table-cell text-center">Giáo viên</TableHead>
            <TableHead className="hidden md:table-cell text-center">Tài liệu</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-mono font-medium">{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.faculty || 'N/A'}</TableCell>
                <TableCell>{course.category || 'N/A'}</TableCell>
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
              <TableCell colSpan={7} className="h-24 text-center">
                Không tìm thấy môn học nào phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}