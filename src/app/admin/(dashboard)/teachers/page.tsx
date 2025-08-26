'use client'; // QUAN TRỌNG: Chuyển thành Client Component để có thể tương tác

import Link from "next/link";
import { useState } from "react"; // Import useState để quản lý trạng thái filter
import { MOCK_COURSES, MOCK_TEACHERS } from "@/lib/mockdata"; // Sửa lại đường dẫn nếu cần
import { FACULTIES } from "@/lib/constants"; // Import danh sách khoa
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import component Select

export default function AdminTeachersPage() {
  // State để lưu trữ khoa đang được chọn để lọc
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");

  // Logic lọc danh sách giảng viên dựa trên state
  const filteredTeachers = selectedFaculty === "all"
    ? MOCK_TEACHERS
    : MOCK_TEACHERS.filter(teacher => teacher.faculty === selectedFaculty);

  // Hàm helper để lấy tên đầy đủ của khoa từ mã khoa
  const getFacultyLabel = (facultyValue: string) => {
    return FACULTIES.find(f => f.value === facultyValue)?.label || facultyValue;
  };

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

      {/* --- BỘ LỌC THEO KHOA --- */}
      <div className="flex justify-end my-4">
        <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Lọc theo khoa..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả các khoa</SelectItem>
            {FACULTIES.map(faculty => (
              <SelectItem key={faculty.value} value={faculty.value}>
                {faculty.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* ------------------------- */}

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên giảng viên</TableHead>
                {/* --- THÊM CỘT MỚI --- */}
                <TableHead>Khoa phụ trách</TableHead>
                <TableHead>Số môn phụ trách</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* --- SỬ DỤNG DANH SÁCH ĐÃ LỌC --- */}
              {filteredTeachers.map((teacher) => {
                const coursesTaughtCount = MOCK_COURSES.filter(course => 
                  course.teachers.some(t => t.id === teacher.id)
                ).length;
                
                return (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    {/* --- HIỂN THỊ DỮ LIỆU CỘT MỚI --- */}
                    <TableCell>{getFacultyLabel(teacher.faculty || "")}</TableCell>
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