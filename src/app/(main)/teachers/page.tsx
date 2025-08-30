import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import TeacherFilter from "@/components/TeacherFilter";
import { MOCK_TEACHERS } from "@/lib/mockdata";
import TeachersTable from "@/components/TeacherTable";
import TeachersTableSkeleton from "@/components/TeacherTableSkeleton";

export default function TeachersPage({
  searchParams,
}: {
  searchParams?: {
    faculty?: string;
  };
}) {
  const allFaculties = Array.from(new Set(MOCK_TEACHERS.map(t => t.faculty).filter((f): f is string => !!f)));

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold">Danh sách môn học</h1>
        <div className="w-full sm:w-auto sm:max-w-xs">
          <SearchBar placeholder="Tìm kiếm trong danh sách..." />
        </div>
      </div>
      <TeacherFilter faculties={allFaculties} />
      <Suspense fallback={<TeachersTableSkeleton />}>
        <TeachersTable searchParams={searchParams} />
      </Suspense>
    </main>
  );
}