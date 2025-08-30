'use client';

import { useRouter } from "next/navigation";
import { AdminDocument } from "@/lib/mockdata";
import { Course } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DocumentFormProps {
    initialData?: AdminDocument | null;
    courses: Pick<Course, 'id' | 'name' | 'code'>[]; 
    onSuccess: () => void;
    onCancel: () => void;
}

const DOCUMENT_TYPES = ["Slide", "Đề thi", "Bài giảng", "Tài liệu tham khảo", "Bài tập lớn"];

export default function DocumentForm({ initialData, courses }: DocumentFormProps) {
    const router = useRouter();
    const isEditMode = !!initialData;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Đã ${isEditMode ? 'cập nhật' : 'tạo mới'} tài liệu thành công!`);
        router.push('/admin/documents');
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>{isEditMode ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}</CardTitle>
                    {/* <CardDescription>
                        Điền thông tin và liên kết đến tài liệu.
                    </CardDescription> */}
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="course">Môn học</Label>
                        <Select required defaultValue={initialData?.course.id || ''}>
                            <SelectTrigger id="course">
                                <SelectValue placeholder="Chọn môn học cho tài liệu" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map(course => (
                                    <SelectItem key={course.id} value={course.id}>
                                        {course.code} - {course.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="name">Tên tài liệu</Label>
                        <Input id="name" defaultValue={initialData?.name || ''} placeholder="Ví dụ: Đề thi cuối kỳ 20231" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="type">Loại tài liệu</Label>
                             <Select required defaultValue={initialData?.type || ''}>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Chọn loại tài liệu" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DOCUMENT_TYPES.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="link">Link Google Drive</Label>
                            <Input id="link" type="url" defaultValue={initialData?.link || ''} placeholder="https://docs.google.com/..." required />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="mt-6 flex justify-end gap-2 max-w-3xl mx-auto">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                    Hủy
                </Button>
                <Button type="submit">
                    {isEditMode ? 'Lưu thay đổi' : 'Tạo tài liệu'}
                </Button>
            </div>
        </form>
    )
}