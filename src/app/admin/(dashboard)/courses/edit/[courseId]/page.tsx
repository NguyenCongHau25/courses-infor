import CourseForm from "@/components/admin/courseForm";
import { MOCK_COURSES } from "@/lib/mockdata";
import { notFound } from "next/navigation";

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
    const course = MOCK_COURSES.find(c => c.id === params.courseId);

    if (!course) {
        notFound();
    }

    return (
        // Áp dụng container căn giữa tương tự ở đây
        <div className="flex flex-col justify-center items-center h-full">
            <div className="w-full max-w-4xl">
                <CourseForm initialData={course} />
            </div>
        </div>
    );
}