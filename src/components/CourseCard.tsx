// CourseCard component
import Link from "next/link";
import { Course } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{course.name}</CardTitle>
        <CardDescription>{course.code}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-slate-600 space-y-2">
            <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-500" />
                <span>{course.teachers.length} giáo viên</span>
            </div>
            <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-slate-500" />
                <span>{course.documents.length} tài liệu</span>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/courses/${course.id}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}