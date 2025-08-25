import { MOCK_COURSES, MOCK_TEACHERS } from "@/lib/mockdata";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeachersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Danh sách Giảng viên</h1>
      
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Tên giảng viên</TableHead>
                <TableHead className="text-justify">Số môn phụ trách</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_TEACHERS.map((teacher) => {
                // Đếm số môn học mà giảng viên này dạy
                const coursesTaughtCount = MOCK_COURSES.filter(course => 
                  course.teachers.some(t => t.id === teacher.id)
                ).length;

                return (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell className="text-justify">{coursesTaughtCount}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/teachers/${teacher.id}`}>Xem chi tiết</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}