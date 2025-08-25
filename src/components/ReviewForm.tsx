'use client';

import { Teacher } from "@/types";
import { Button } from "@/components/ui/button"
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReviewFormProps {
    teachers: Teacher[];
}

export default function ReviewForm({ teachers }: ReviewFormProps) {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý logic gửi form ở đây trong tương lai
        // Ví dụ: lấy dữ liệu từ form và gọi API
        alert("Cảm ơn bạn đã đóng góp ý kiến! Ý kiến sẽ được hiển thị sau khi admin phê duyệt.");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="teacher" className="mb-2 block">Chọn giáo viên</Label>
                <Select required>
                    <SelectTrigger id="teacher">
                        <SelectValue placeholder="Chọn giáo viên bạn muốn đánh giá" />
                    </SelectTrigger>
                    <SelectContent>
                        {teachers.map(teacher => (
                             <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div>
                <Label className="mb-2 block">Đánh giá</Label>
                 {/* Bạn có thể làm component sao xịn hơn ở đây */}
                <p className="text-sm text-slate-500">Feature đánh giá sao sẽ được cập nhật sau.</p>
            </div>
            <div>
                <Label htmlFor="comment" className="mb-2 block">Nội dung đánh giá</Label>
                <Textarea
                    id="comment"
                    placeholder="Giáo viên dạy có dễ hiểu không? Tài liệu có hữu ích không?..."
                    required
                />
            </div>
            <Button type="submit">Gửi đóng góp</Button>
        </form>
    );
}