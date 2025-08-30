import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import CourseFilters from "@/components/CourseFilter"; 
import { MOCK_COURSES } from "@/lib/mockdata"; 
import CoursesTable from "@/components/CourseTable";
import TableSkeleton from "@/components/TableSkeleton";

export default function CoursesPage({
  searchParams,
}: {
  searchParams?: { 
    query?: string;
    faculty?: string;
    category?: string;
  };
}) {
  const allFaculties = Array.from(new Set(MOCK_COURSES.map(c => c.faculty).filter((f): f is string => !!f)));
  const allCategories = Array.from(new Set(MOCK_COURSES.map(c => c.category).filter((c): c is string => !!c)));

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold">Danh sách môn học</h1>
        <div className="w-full sm:w-auto sm:max-w-xs">
          <SearchBar placeholder="Tìm kiếm trong danh sách..." />
        </div>
      </div>
      <CourseFilters faculties={allFaculties} categories={allCategories} />
      <Suspense fallback={<TableSkeleton />}>
        <CoursesTable searchParams={searchParams ?? {}} />
      </Suspense>
    </main>
  );
}