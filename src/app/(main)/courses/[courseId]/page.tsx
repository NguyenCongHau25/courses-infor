import { MOCK_COURSES } from "@/lib/mockdata";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, Book, FileText, Star, MessageSquare } from "lucide-react";
import ReviewForm from "@/components/ReviewForm"; // Sẽ tạo component này

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = MOCK_COURSES.find(c => c.id === params.courseId);

  if (!course) {
    notFound();
  }
  
  // Chuyển đổi JSON string thành object để hiển thị
  const grading = course.gradingStructure ? JSON.parse(course.gradingStructure) : {};

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 py-10">
        {/* Header của trang */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{course.code} - {course.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột chính */}
          <div className="lg:col-span-2 space-y-8">
            {/* Giới thiệu */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText /> Giới thiệu môn học</CardTitle></CardHeader>
              <CardContent><p className="text-slate-700 leading-relaxed">{course.description}</p></CardContent>
            </Card>

            {/* Cấu trúc điểm */}
            <Card>
              <CardHeader><CardTitle>Cấu trúc điểm</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {Object.entries(grading).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span>{key}</span>
                      
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Đánh giá */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare /> Đánh giá từ sinh viên</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {course.reviews.map(review => (
                  <div key={review.id}>
                    <div className="flex items-center justify-between mb-2">
                       <p className="font-semibold">{review.teacher.name}</p>
                       <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                          ))}
                       </div>
                    </div>
                    <p className="text-slate-600 italic">"{review.comment}"</p>
                  </div>
                ))}
                
                <Separator className="my-6" />

                {/* Form đóng góp ý kiến */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Đóng góp ý kiến của bạn</h3>
                  <ReviewForm teachers={course.teachers} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cột phụ */}
          <div className="space-y-8">
            {/* Giáo viên */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Users /> Giáo viên giảng dạy</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.teachers.map(teacher => <li key={teacher.id}>{teacher.name}</li>)}
                </ul>
              </CardContent>
            </Card>

            {/* Tài liệu */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Book /> Tài liệu tham khảo</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.documents.map(doc => (
                    <li key={doc.id}>
                      <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        [{doc.type}] {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}