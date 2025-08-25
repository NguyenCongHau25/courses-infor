import Link from "next/link";
import { MOCK_COURSES, MOCK_TEACHERS } from "@/lib/mockdata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Lưu ý: Phần Dialog xác nhận xóa có thể được tái sử dụng hoặc tạo riêng

export default function AdminTeachersPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Giảng viên</h1>
          {/* <p className="text-muted-foreground">Thêm, sửa, xóa thông tin các giảng viên.</p> */}
        </div>
        <Button asChild>
          <Link href="/admin/teachers/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Thêm giảng viên
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên giảng viên</TableHead>
                <TableHead>Số môn phụ trách</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_TEACHERS.map((teacher) => {
                const coursesTaughtCount = MOCK_COURSES.filter(course => 
                  course.teachers.some(t => t.id === teacher.id)
                ).length;
                
                return (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{coursesTaughtCount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                              <Link href={`/admin/teachers/edit/${teacher.id}`}>Sửa</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}