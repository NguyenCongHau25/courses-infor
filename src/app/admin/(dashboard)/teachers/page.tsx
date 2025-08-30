'use client';

import Link from "next/link";
import { useState } from "react"; 
import { MOCK_COURSES, MOCK_TEACHERS } from "@/lib/mockdata"; 
import { FACULTIES } from "@/lib/constants"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TeacherForm from "@/components/admin/teacherForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"; 
export default function AdminTeachersPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState<any>(null);
  const filteredTeachers = selectedFaculty === "all"
    ? MOCK_TEACHERS
    : MOCK_TEACHERS.filter(teacher => teacher.faculty === selectedFaculty);

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
        <Button onClick={() => { setEditTeacher(null); setModalOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" /> Thêm giảng viên
        </Button>
      </div>
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
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên giảng viên</TableHead>
                <TableHead>Khoa phụ trách</TableHead>
                <TableHead>Số môn phụ trách</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => {
                const coursesTaughtCount = MOCK_COURSES.filter(course => 
                  course.teachers.some(t => t.id === teacher.id)
                ).length;
                
                return (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
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
                          <DropdownMenuItem onClick={() => { setEditTeacher(teacher); setModalOpen(true); }}>
                            Sửa
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

      {/* Modal for create/edit teacher */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editTeacher ? "Chỉnh sửa giảng viên" : "Thêm giảng viên"}</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <TeacherForm
            initialData={editTeacher}
            onSuccess={() => { setModalOpen(false); setEditTeacher(null); } }
            onCancel={() => { setModalOpen(false); setEditTeacher(null); } } 
            allCourses={MOCK_COURSES}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}