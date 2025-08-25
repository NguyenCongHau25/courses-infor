'use client'; // Cần client component để xử lý các nút

import { MOCK_REVIEWS } from "@/lib/mockdata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Trash2, Star, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AdminReviewsPage() {

  const handleApprove = (reviewId: string) => {
    alert(`Đã duyệt đánh giá ID: ${reviewId}.`);
  };

  const handleDelete = (reviewId: string) => {
    if(confirm('Bạn có chắc muốn xóa đánh giá này?')) {
      alert(`Đã xóa đánh giá ID: ${reviewId}.`);
    }
  };
  
  const unapprovedReviews = MOCK_REVIEWS.filter(r => !r.isApproved);
  const approvedReviews = MOCK_REVIEWS.filter(r => r.isApproved);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Quản lý Đánh giá</h1>
        {/* <p className="text-muted-foreground">Duyệt các đánh giá và bình luận do người dùng đóng góp.</p> */}
      </div>

      {/* Phần đánh giá chờ duyệt */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Đánh giá chờ duyệt ({unapprovedReviews.length})
          </CardTitle>
          <CardDescription>
            Các đánh giá này cần được xem xét trước khi hiển thị công khai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {unapprovedReviews.length > 0 ? unapprovedReviews.map((review, index) => (
              <div key={review.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{review.teacher.name} - <span className="text-primary">{review.course.name}</span></p>
                    <div className="flex items-center gap-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <p className="text-slate-700 italic">"{review.comment}"</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleApprove(review.id)}>
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(review.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {index < unapprovedReviews.length - 1 && <Separator className="mt-6" />}
              </div>
            )) : <p className="text-slate-500 text-center py-4">Không có đánh giá mới nào.</p>}
          </div>
        </CardContent>
      </Card>
      
      {/* Phần đánh giá đã duyệt (để tham khảo) */}
       <Card className="mt-8">
        <CardHeader>
          <CardTitle>Lịch sử đánh giá đã duyệt ({approvedReviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             {approvedReviews.map(review => (
               <div key={review.id} className="text-sm p-3 bg-slate-50 rounded-md">
                 <p><span className="font-semibold">{review.teacher.name}:</span> <span className="text-slate-600 italic">"{review.comment}"</span></p>
               </div>
             ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}