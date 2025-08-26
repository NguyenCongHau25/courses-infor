'use client';

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CourseFiltersProps {
  faculties: string[];
  categories: string[];
}

export default function CourseFilters({ faculties, categories }: CourseFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ĐỌC GIÁ TRỊ: Nếu param không tồn tại, mặc định là "all"
  const currentFaculty = searchParams.get('faculty') || "all";
  const currentCategory = searchParams.get('category') || "all";

  const handleFilterChange = (filterType: 'faculty' | 'category', value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // CẬP NHẬT LOGIC: Nếu người dùng chọn "all", xóa param khỏi URL
    if (value === "all") {
      current.delete(filterType);
    } else {
      current.set(filterType, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`/courses${query}`);
  };

  return (
    <div className="flex justify-end gap-2 mb-4">
        <div className="w-40">
            <Select value={currentFaculty} onValueChange={(value) => handleFilterChange('faculty', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Lọc theo khoa" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả khoa</SelectItem>
                    {faculties.map(faculty => (
                        <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <div className="w-40">
            <Select value={currentCategory} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Lọc theo nhóm môn" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả nhóm</SelectItem>
                    {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </div>
  );
}