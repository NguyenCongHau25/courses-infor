import DocumentForm from "@/components/admin/documentForm";
import { MOCK_COURSES } from "@/lib/mockdata";

export default function NewDocumentPage() {
    // Trong ứng dụng thật, bạn sẽ fetch danh sách courses từ API ở đây
    const courses = MOCK_COURSES.map(c => ({ id: c.id, name: c.name, code: c.code }));

    return (
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl text-center font-bold mb-6">
          Thêm tài liệu mới
        </h1>
        <div className="w-full max-w-4xl">
          <DocumentForm courses={courses} />
        </div>
      </div>
    );
}