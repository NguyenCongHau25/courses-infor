// Các kiểu dữ liệu này nên phản ánh đúng cấu trúc trong Prisma Schema
export interface Teacher {
  id: string;
  name: string;
  description?: string;
  faculty?: string; 
}

export interface Document {
  id: string;
  name:string;
  type: string;
  link: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  teacher: Teacher;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description?: string; // Đây sẽ là mô tả dạng text
  syllabusUrl?: string; // Đây sẽ là link đến file PDF đề cương
  gradingStructure?: string;
  faculty?: string;     
  category?: string;   
  teachers: Teacher[]; 
  documents: Document[];
  reviews: Review[];
}

// Kiểu dữ liệu cho một môn học khi xem chi tiết (có thể giống hệt Course)
export type CourseDetail = Course;