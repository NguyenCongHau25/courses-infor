import { CourseDetail } from "@/types";

// Trong file frontend/src/lib/mock-data.ts
export const MOCK_TEACHERS = [
  { id: 't1', name: 'PGS.TS. Nguyễn Thanh Tùng', faculty: 'KHMT' },
  { id: 't2', name: 'TS. Đặng Tuấn Linh', faculty: 'KTMT' },
  { id: 't3', name: 'ThS. Nguyễn Thị Thu Trang', faculty: 'KTPM' },
];

export const MOCK_COURSES: CourseDetail[] = [
  {
    id: 'it4440',
    code: 'IT4440',
    name: 'Phát triển ứng dụng Web',
    faculty: 'KTPM', // Thêm dữ liệu
    category: 'Chuyên ngành', // Thêm dữ liệu, hiển thị trên table
    description: 'Môn học cung cấp các kiến thức cơ bản về công nghệ Web, bao gồm các kiến thức nền tảng như HTML, CSS, JavaScript, và các công nghệ phía máy chủ như Node.js, Express, và cơ sở dữ liệu. Sinh viên sẽ được thực hành xây dựng một ứng dụng web hoàn chỉnh.',
    syllabusUrl: '/mock-data/it4440-syllabus.pdf', // Link giả đến file đề cương
    gradingStructure: '{"Quá trình": 10, "Thực hành": 10, "Giữa kì": 20, "Thi cuối kỳ": 60}',
    teachers: [MOCK_TEACHERS[0], MOCK_TEACHERS[1]],
    documents: [
      { id: 'd1', name: 'Slide bài giảng tuần 1', type: 'Slide', link: '#' },
      { id: 'd2', name: 'Đề thi cuối kỳ 20221', type: 'Đề thi', link: '#' },
    ],
    reviews: [
      { id: 'r1', rating: 5, comment: 'Thầy Tùng dạy rất hay và dễ hiểu, tài liệu đầy đủ.', teacher: MOCK_TEACHERS[0] },
      { id: 'r2', rating: 4, comment: 'Thầy Linh nhiệt tình nhưng đôi khi nói hơi nhanh.', teacher: MOCK_TEACHERS[1] },
    ],
  },
  {
    id: 'it3100',
    code: 'IT3100',
    name: 'Lập trình hướng đối tượng',
    faculty: 'KHMT', // Thêm dữ liệu
    category: 'Cơ sở ngành', // Thêm dữ liệu
    description: 'Môn học tập trung vào các khái niệm cốt lõi của lập trình hướng đối tượng (OOP) như tính đóng gói, kế thừa, đa hình và trừu tượng. Ngôn ngữ chính được sử dụng là Java.',
    syllabusUrl: '/mock-data/it4440-syllabus.pdf', // Link giả đến file đề cương
    gradingStructure: '{"Quá trình": 10, "Bài tập": 20, "Thi giữa kỳ": 20, "Thi cuối kỳ": 50}',
    teachers: [MOCK_TEACHERS[2]],
    documents: [
      { id: 'd3', name: 'Tổng hợp code ví dụ', type: 'Tài liệu', link: '#' },
    ],
    reviews: [
      { id: 'r3', rating: 4, comment: 'Cô Trang dạy cẩn thận, chấm điểm khá chặt.', teacher: MOCK_TEACHERS[2] },
    ],
  },
];

// ... (phần MOCK_TEACHERS, MOCK_COURSES giữ nguyên)

// Thêm kiểu dữ liệu mở rộng cho tài liệu trong trang admin
import { Document} from "@/types";
export interface AdminDocument extends Document {
  isApproved: boolean;
  course: Pick<Course, 'id' | 'name' | 'code'>; // Lấy thông tin môn học liên quan
}

// Tạo một danh sách tài liệu riêng biệt
export const MOCK_DOCUMENTS: AdminDocument[] = [
  // Lấy dữ liệu từ các môn học đã có
  { 
    id: 'd1', name: 'Slide bài giảng tuần 1', type: 'Slide', link: '#', isApproved: true, 
    course: { id: 'it4440', name: 'Phát triển ứng dụng Web', code: 'IT4440' }
  },
  { 
    id: 'd2', name: 'Đề thi cuối kỳ 20221', type: 'Đề thi', link: '#', isApproved: true, 
    course: { id: 'it4440', name: 'Phát triển ứng dụng Web', code: 'IT4440' }
  },
  { 
    id: 'd3', name: 'Tổng hợp code ví dụ', type: 'Tài liệu', link: '#', isApproved: true, 
    course: { id: 'it3100', name: 'Lập trình hướng đối tượng', code: 'IT3100' }
  },
  // Thêm dữ liệu mới để mô phỏng trạng thái chờ duyệt
  { 
    id: 'd4', name: 'Bài tập lớn mẫu tham khảo', type: 'Tài liệu', link: '#', isApproved: false, 
    course: { id: 'it4440', name: 'Phát triển ứng dụng Web', code: 'IT4440' }
  },
  { 
    id: 'd5', name: 'Slide OOP cô Trang', type: 'Slide', link: '#', isApproved: false, 
    course: { id: 'it3100', name: 'Lập trình hướng đối tượng', code: 'IT3100' }
  },
];

// ...
// Thêm kiểu dữ liệu mở rộng cho đánh giá
import { Review, Course, Teacher } from "@/types";
export interface AdminReview extends Review {
  isApproved: boolean;
  course: Pick<Course, 'id' | 'name' | 'code'>;
  // teacher đã có sẵn trong Review type
}

// Tạo danh sách đánh giá riêng biệt
export const MOCK_REVIEWS: AdminReview[] = [
  // Dữ liệu đã được duyệt
  { 
    id: 'r1', rating: 5, comment: 'Thầy Tùng dạy rất hay và dễ hiểu, tài liệu đầy đủ.', 
    teacher: MOCK_TEACHERS[0], isApproved: true,
    course: { id: 'it4440', name: 'Phát triển ứng dụng Web', code: 'IT4440' }
  },
  { 
    id: 'r2', rating: 4, comment: 'Thầy Linh nhiệt tình nhưng đôi khi nói hơi nhanh.', 
    teacher: MOCK_TEACHERS[1], isApproved: true,
    course: { id: 'it4440', name: 'Phát triển ứng dụng Web', code: 'IT4440' }
  },
  // Dữ liệu mới, chờ duyệt
  { 
    id: 'r4', rating: 5, comment: 'Môn học rất bổ ích, giúp em có cái nhìn tổng quan về OOP.',
    teacher: MOCK_TEACHERS[2], isApproved: false,
    course: { id: 'it3100', name: 'Lập trình hướng đối tượng', code: 'IT3100' }
  },
  { 
    id: 'r5', rating: 3, comment: 'Nội dung hơi khó, cần xem lại bài giảng nhiều lần.',
    teacher: MOCK_TEACHERS[0], isApproved: false,
    course: { id: 'it4440', name: 'Phát triển ứng dụng Web', code: 'IT4440' }
  },
];