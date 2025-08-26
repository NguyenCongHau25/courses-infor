import DocumentForm from "@/components/admin/documentForm"; // Tên component viết hoa chữ cái đầu
import { MOCK_COURSES, MOCK_DOCUMENTS } from "@/lib/mockdata"; // Sửa tên file và import MOCK_DOCUMENTS
import { notFound } from "next/navigation";

export default function EditDocumentPage({ params }: { params: { documentId: string } }) {
    const document = MOCK_DOCUMENTS.find(d => d.id === params.documentId);
    const allCourses = MOCK_COURSES;

    if (!document) {
        notFound();
    }

    return (
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl text-center font-bold mb-6">
          Chỉnh sửa tài liệu
        </h1>
        <div className="w-full max-w-4xl">
          <DocumentForm initialData={document} courses={allCourses} />
        </div>
      </div>
    );
}