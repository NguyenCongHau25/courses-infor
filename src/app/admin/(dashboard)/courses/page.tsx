'use client'; 

import Link from "next/link";
import { useState } from "react";
import { MOCK_COURSES } from "@/lib/mockdata"; // Sửa lại đường dẫn nếu cần
import { FACULTIES, COURSE_CATEGORIES } from "@/lib/constants"; // Import các hằng số
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Bỏ các import không dùng
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import component Select
import { Course } from "@/types";
import { ExternalLink } from "lucide-react";

export default function AdminCoursesPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // --- THÊM STATE CHO CÁC BỘ LỌC ---
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // --- LOGIC LỌC DỮ LIỆU ---
  let filteredCourses = MOCK_COURSES;

  if (selectedFaculty !== "all") {
    filteredCourses = filteredCourses.filter(course => course.faculty === selectedFaculty);
  }

  if (selectedCategory !== "all") {
    filteredCourses = filteredCourses.filter(course => course.category === selectedCategory);
  }
  
  // --- HÀM HELPER ĐỂ HIỂN THỊ LABEL ---
  const getFacultyLabel = (facultyValue?: string) => {
    return FACULTIES.find(f => f.value === facultyValue)?.label || facultyValue || "N/A";
  };
  const getCategoryLabel = (categoryValue?: string) => {
    return COURSE_CATEGORIES.find(c => c.value === categoryValue)?.label || categoryValue || "N/A";
  };


  const handleDeleteClick = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    alert(`Đã xóa môn học: ${selectedCourse?.name}`);
    setIsDeleteDialogOpen(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Môn học</h1>
          {/* <p className="text-muted-foreground">Thêm, sửa, xóa các môn học trong hệ thống.</p> */}
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Thêm môn học
          </Link>
        </Button>
      </div>

      {/* --- THÊM KHU VỰC BỘ LỌC --- */}
      <div className="flex justify-end gap-4 my-4">
        <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Lọc theo khoa quản lý..." />
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
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Lọc theo nhóm môn học..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả nhóm môn</SelectItem>
            {COURSE_CATEGORIES.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* --------------------------- */}

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã môn</TableHead>
                <TableHead>Tên môn học</TableHead>
                {/* --- THÊM CỘT MỚI --- */}
                <TableHead>Khoa QL</TableHead>
                <TableHead>Nhóm môn</TableHead>
                <TableHead>Số GV</TableHead>
                <TableHead>Link file</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* --- SỬ DỤNG DỮ LIỆU ĐÃ LỌC --- */}
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-mono">{course.code}</TableCell>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  {/* --- HIỂN THỊ DỮ LIỆU CỘT MỚI --- */}
                  <TableCell>{getFacultyLabel(course.faculty)}</TableCell>
                  <TableCell>{getCategoryLabel(course.category)}</TableCell>
                  <TableCell>{course.teachers.length}</TableCell>
                  <TableCell>{course.syllabusUrl ? (
                      <Button asChild variant="outline" size="icon">
                        <a href={course.syllabusUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/edit/${course.id}`}>Sửa</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(course)} className="text-red-600">
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Dialog xác nhận xóa */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        {/* ... (Nội dung Dialog giữ nguyên) ... */}
      </AlertDialog>
    </>
  );
}