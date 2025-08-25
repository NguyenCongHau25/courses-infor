import CourseForm from "@/components/admin/courseForm";

export default function NewCoursePage() {
  return (
    // Container này sẽ chiếm toàn bộ chiều cao và căn giữa nội dung của nó
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-full max-w-4xl">
        <CourseForm />
      </div>
    </div>
  );
}