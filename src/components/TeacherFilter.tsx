'use client';

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface TeacherFilterProps {
  faculties: string[];
}

export default function TeacherFilter({ faculties }: TeacherFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Đọc giá trị filter hiện tại từ URL, mặc định là "all"
  const currentFaculty = searchParams.get('faculty') || "all";

  const handleFacultyChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // Nếu người dùng chọn "all", xóa param 'faculty' khỏi URL
    if (value === "all") {
      current.delete('faculty');
    } else {
      current.set('faculty', value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    // Điều hướng đến URL mới, việc này sẽ trigger Server Component re-render
    router.push(`/teachers${query}`);
  };

  return (
    <div className="flex justify-end mb-4">
      <div className="w-full sm:w-auto sm:min-w-[250px]">
         <Select value={currentFaculty} onValueChange={handleFacultyChange}>
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
    </div>
  );
}