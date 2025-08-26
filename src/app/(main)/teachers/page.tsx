import Link from "next/link";
import TeacherFilter from "@/components/TeacherFilter";
import SearchBar from "@/components/SearchBar";
import { MOCK_COURSES, MOCK_TEACHERS } from "@/lib/mockdata";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Đây là Server Component
export default function TeachersPage({
  searchParams,
}: {
  searchParams?: { 
    faculty?: string;
  };
}) {
  const facultyFilter = searchParams?.faculty || '';
  const allFaculties = Array.from(new Set(MOCK_TEACHERS.map(t => t.faculty).filter((f): f is string => !!f)));
  const filteredTeachers = MOCK_TEACHERS.filter(teacher => {
    const matchFaculty = !facultyFilter || teacher.faculty === facultyFilter;
    return matchFaculty;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold">Danh sách giảng viên</h1>
              <div className="w-full sm:w-auto sm:max-w-xs">
                <SearchBar placeholder="Tìm kiếm trong danh sách..." />
              </div>
            </div>
      
      <TeacherFilter faculties={allFaculties} />
      
      <Card>
        <CardHeader>
          <CardTitle>Tất cả giảng viên</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[35%]">Tên giảng viên</TableHead>
                <TableHead>Khoa phụ trách</TableHead>
                <TableHead>Số môn phụ trách</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length > 0 ? (
                // Nếu có dữ liệu, map qua và render các hàng
                filteredTeachers.map((teacher) => {
                  const coursesTaughtCount = MOCK_COURSES.filter(course => 
                    course.teachers.some(t => t.id === teacher.id)
                  ).length;

                  return (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>{teacher.faculty || 'N/A'}</TableCell>
                      <TableCell>{coursesTaughtCount}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/teachers/${teacher.id}`}>Xem chi tiết</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                // Nếu không có dữ liệu, render một hàng duy nhất với thông báo
                <TableRow>
                  <TableCell 
                    colSpan={4} // Số lượng cột trong bảng
                    className="h-24 text-center"
                  >
                    Không tìm thấy giảng viên nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}