'use client';

import { Teacher, Course } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MultiSelect, OptionType } from "@/components/ui/multi-select-combobox"; // Import component mới

// Mở rộng kiểu Teacher để bao gồm danh sách các môn học
interface TeacherWithCourses extends Teacher {
  courses: Pick<Course, 'id' | 'name'>[];
}
interface TeacherFormProps {
    initialData?: TeacherWithCourses | null;
    allCourses: Pick<Course, 'id' | 'name' | 'code'>[]; // Cần danh sách tất cả môn học
}

export default function TeacherForm({ initialData, allCourses }: TeacherFormProps) {
    const router = useRouter();
    const isEditMode = !!initialData;
    
    // State để lưu trữ ID của các môn học được chọn
    const [selectedCourses, setSelectedCourses] = useState<string[]>(
        initialData?.courses?.map(c => c.id) || []
    );

    // Chuyển đổi danh sách tất cả môn học thành định dạng mà MultiSelect có thể hiểu
    const courseOptions: OptionType[] = allCourses.map(course => ({
        value: course.id,
        label: `${course.code} - ${course.name}`
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(
          `Đã ${isEditMode ? 'cập nhật' : 'tạo mới'} giảng viên thành công!` + 
          `\nCác môn học được chọn có ID: ${selectedCourses.join(', ')}`
        );
        router.push('/admin/teachers');
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>{isEditMode ? 'Chỉnh sửa giảng viên' : 'Tạo giảng viên mới'}</CardTitle>
                    <CardDescription>
                        Điền thông tin và chọn các môn học giảng viên phụ trách.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name">Tên giảng viên</Label>
                        <Input id="name" defaultValue={initialData?.name || ''} placeholder="Ví dụ: PGS.TS. Nguyễn Văn A" required />
                    </div>
                    <div>
                        <Label htmlFor="description">Mô tả / Thông tin thêm</Label>
                        <Textarea id="description" defaultValue={initialData?.description || ''} rows={5} placeholder="Thông tin về học vị, chuyên ngành, thành tích..."/>
                    </div>
                    {/* Trường chọn môn học mới */}
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