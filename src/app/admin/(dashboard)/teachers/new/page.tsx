import TeacherForm from "@/components/admin/teacherForm";
import { MOCK_COURSES } from "@/lib/mockdata";

export default function NewTeacherPage() {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="w-full max-w-4xl">
                {/* <h1 className="text-3xl font-bold mb-6 text-center">Thêm giảng viên mới</h1> */}
                {/* Truyền vào danh sách tất cả môn học */}
                <TeacherForm allCourses={MOCK_COURSES} />
            </div>
        </div>
    )
}