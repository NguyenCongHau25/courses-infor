'use client';

import { Teacher, Course } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input"; // Sửa lỗi viết hoa: "Input" -> "input"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MultiSelect, OptionType } from "@/components/ui/multi-select-combobox";
// Import đầy đủ các thành phần của Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mở rộng kiểu Teacher để bao gồm danh sách các môn học và khoa phụ trách
interface TeacherWithCourses extends Teacher {
  courses: Pick<Course, 'id' | 'name'>[];
}
interface TeacherFormProps {
    initialData?: TeacherWithCourses | null;
    allCourses: Pick<Course, 'id' | 'name' | 'code'>[];
}

const FACULTIES = [
  { value: "KHMT", label: "KHMT" },
  { value: "KTMT", label: "KTMT" },
  { value: "CNPM", label: "CNPM" },
  { value: "HTTT", label: "HTTT" },
  { value: "MMTTT", label: "MMTDL" },
  { value: "KTTT", label: "KTTT"},
  { value: "PĐTĐH", label: "PĐTĐH"}
];

export default function TeacherForm({ initialData, allCourses }: TeacherFormProps) {
    const router = useRouter();
    const isEditMode = !!initialData;
    
    const [selectedCourses, setSelectedCourses] = useState<string[]>(
        initialData?.courses?.map(c => c.id) || []
    );
    // State cho khoa, đảm bảo có giá trị mặc định là chuỗi rỗng
    const [faculty, setFaculty] = useState<string>(initialData?.faculty || "");

    const courseOptions: OptionType[] = allCourses.map(course => ({
        value: course.id,
        label: `${course.code} - ${course.name}`
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(
          `Đã ${isEditMode ? 'cập nhật' : 'tạo mới'} giảng viên thành công!` + 
          `\nCác môn học được chọn có ID: ${selectedCourses.join(', ')}` +
          `\nKhoa phụ trách: ${faculty}`
        );
        router.push('/admin/teachers');
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    {/* ... */}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name">Tên giảng viên</Label>
                        <Input id="name" defaultValue={initialData?.name || ''} placeholder="Ví dụ: PGS.TS. Nguyễn Văn A" required />
                    </div>
                    {/* --- Cấu trúc Select hoàn chỉnh --- */}
                    <div>
                        <Label htmlFor="faculty">Khoa phụ trách</Label>
                        <Select
                          value={faculty} // Giá trị hiện tại của select
                          onValueChange={setFaculty} // Hàm được gọi khi thay đổi giá trị
                          required
                        >
                          {/* 1. SelectTrigger: Cái người dùng nhìn thấy và bấm vào */}
                          <SelectTrigger id="faculty">
                            {/* 2. SelectValue: Hiển thị giá trị đã chọn, hoặc placeholder */}
                            <SelectValue placeholder="Chọn một khoa" />
                          </SelectTrigger>
                          {/* 3. SelectContent: Chứa danh sách các lựa chọn */}
                          <SelectContent>
                            {FACULTIES.map(f => (
                              <SelectItem key={f.value} value={f.value}>
                                {f.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="description">Mô tả / Thông tin thêm</Label>
                        <Textarea id="description" defaultValue={initialData?.description || ''} rows={5} placeholder="Thông tin về học vị, chuyên ngành, thành tích..."/>
                    </div>
                    <div>
                        <Label>Các môn học phụ trách</Label>
                        <MultiSelect 
                            options={courseOptions}
                            selected={selectedCourses}
                            onChange={setSelectedCourses}
                            placeholder="Chọn một hoặc nhiều môn học..."
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="mt-6 flex justify-end gap-2 max-w-3xl mx-auto">
              
                <Button variant="outline" type="button" onClick={() => router.back()}>
                    Hủy
                </Button>
                <Button type="submit">
                    {isEditMode ? 'Lưu thay đổi' : 'Tạo giảng viên'}
                </Button>
         
            </div>
        </form>
    )
}