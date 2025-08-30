import Link from "next/link";
import { MOCK_COURSES, MOCK_TEACHERS } from "@/lib/mockdata";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TeachersTable({ searchParams }: {
    searchParams?: { 
    faculty?: string;
  };
}) {
  const facultyFilter = searchParams?.faculty || '';
  const filteredTeachers = MOCK_TEACHERS.filter(teacher => !facultyFilter || teacher.faculty === facultyFilter);

  return (
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
              <TableRow>
                <TableCell 
                  colSpan={4}
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
  );
}