import TeacherForm from "@/components/admin/teacherForm";
import { MOCK_COURSES, MOCK_TEACHERS } from "@/lib/mockdata";
import { notFound } from "next/navigation";

export default function EditTeacherPage({ params }: { params: { teacherId: string } }) {
    // 1. Tìm thông tin cơ bản của giảng viên
    const teacher = MOCK_TEACHERS.find(t => t.id === params.teacherId);

    if (!teacher) {
        notFound();
    }

    // 2. Tìm tất cả các môn học mà giảng viên này dạy
    const coursesTaught = MOCK_COURSES.filter(course =>
        course.teachers.some(t => t.id === params.teacherId)
    ).map(course => ({ id: course.id, name: course.name })); // Chỉ lấy thông tin cần thiết

    // 3. Tạo đối tượng `initialData` hoàn chỉnh
    const teacherWithCourses = {
        ...teacher,
        courses: coursesTaught,
    };

    return (
        <div className="flex flex-col justify-center items-center h-full">
             <div className="w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Chỉnh sửa thông tin giảng viên</h1>
                {/* 
                  - initialData chứa thông tin của giảng viên và các môn họ đã chọn
                  - allCourses chứa tất cả các lựa chọn môn học có thể có
                */}
                <TeacherForm 
                    initialData={teacherWithCourses} 
                    allCourses={MOCK_COURSES} 
                />
            </div>
        </div>
    );
}