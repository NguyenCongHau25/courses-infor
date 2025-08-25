import Link from "next/link";
import { MOCK_COURSES, MOCK_TEACHERS, MOCK_DOCUMENTS, MOCK_REVIEWS } from "@/lib/mockdata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, BookCopy, Users, FileText, MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboardPage() {
  // Chuẩn bị dữ liệu thống kê từ mock data
  const totalCourses = MOCK_COURSES.length;
  const totalTeachers = MOCK_TEACHERS.length;
  
  const pendingDocuments = MOCK_DOCUMENTS.filter(doc => !doc.isApproved);
  const pendingReviews = MOCK_REVIEWS.filter(r => !r.isApproved);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/admin/courses/new">Thêm môn học mới</Link>
        </Button>
      </div>

      {/* Phần thống kê tổng quan */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số môn học</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">+2 mới trong tháng này</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số giảng viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
            <p className="text-xs text-muted-foreground">+1 mới trong tháng này</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">Tài liệu chờ duyệt</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDocuments.length}</div>
            <p className="text-xs text-muted-foreground">Cần được xem xét</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">Đánh giá chờ duyệt</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews.length}</div>
            <p className="text-xs text-muted-foreground">Cần được xem xét</p>
          </CardContent>
        </Card>
      </section>

      {/* Phần các mục cần hành động */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Cột tài liệu chờ duyệt */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Tài liệu chờ duyệt gần đây</CardTitle>
              {/* <CardDescription>
                Top 5 tài liệu mới nhất cần được phê duyệt.
              </CardDescription> */}
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/documents">
                Xem tất cả
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên tài liệu</TableHead>
                  <TableHead>Môn học</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingDocuments.slice(0, 5).map(doc => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-muted-foreground">{doc.type}</div>
                    </TableCell>
                    <TableCell>{doc.course.code}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Cột đánh giá chờ duyệt */}
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Đánh giá chờ duyệt</CardTitle>
                </div>
                 <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/admin/reviews">
                        Xem tất cả
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="grid gap-4">
               {pendingReviews.slice(0, 4).map((review, index) => (
                   <div key={review.id}>
                     <div className="flex items-center gap-4">
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">{review.teacher.name}</p>
                            <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                        </div>
                     </div>
                     {index < pendingReviews.slice(0, 4).length -1 && <Separator className="mt-4"/>}
                   </div>
               ))}
            </CardContent>
        </Card>
      </section>
    </>
  );
}