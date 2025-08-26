import CourseForm from "@/components/admin/courseForm";

export default function NewCoursePage() {
  return (
    // Container này sẽ chiếm toàn bộ chiều cao và căn giữa nội dung của nó
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl text-center font-bold mb-6">Thêm môn học mới</h1>
      <div className="w-full max-w-4xl">
        <CourseForm />
      </div>
    </div>
  );
}