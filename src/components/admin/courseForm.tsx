'use client';

import { CourseDetail } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { File, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FACULTIES, COURSE_CATEGORIES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 

interface CourseFormProps {
    initialData?: CourseDetail | null;
    onFinished?: () => void; 
}

interface GradingComponents {
  process: number | null;
  practice: number | null;
  midterm: number | null;
  final: number | null;
}


const parseGradingStructure = (jsonString?: string | null): GradingComponents => {
    const initialState: GradingComponents = { process: null, practice: null, midterm: null, final: null };
    if (!jsonString) return initialState;

    try {
        const parsed = JSON.parse(jsonString);
        // Map các key tiếng Việt sang key tiếng Anh của state
        initialState.process = parsed["Quá trình"] || parsed["Chuyên cần"] || null;
        initialState.practice = parsed["Thực hành"] || null;
        initialState.midterm = parsed["Giữa kỳ"] || parsed["Thi giữa kỳ"] || null;
        initialState.final = parsed["Cuối kỳ"] || parsed["Thi cuối kỳ"] || null;
    } catch (error) {
        console.error("Failed to parse grading structure JSON:", error);
    }
    return initialState;
}

// Hàm helper để chuyển từ object state về JSON string để lưu
const formatGradingStructure = (grading: GradingComponents): string => {
    const result: { [key: string]: number } = {};
    if (grading.process) result["Quá trình"] = grading.process;
    if (grading.practice) result["Thực hành"] = grading.practice;
    if (grading.midterm) result["Giữa kỳ"] = grading.midterm;
    if (grading.final) result["Cuối kỳ"] = grading.final;
    
    // Chỉ chuyển thành string nếu có ít nhất 1 giá trị
    return Object.keys(result).length > 0 ? JSON.stringify(result) : "";
}

export default function CourseForm({ initialData, onFinished }: CourseFormProps) {
    const router = useRouter();
    const isEditMode = !!initialData;

    // State để quản lý file đề cương mới được chọn
    const [syllabusFile, setSyllabusFile] = useState<File | null>(null);
    // State để theo dõi link đề cương cũ (khi ở chế độ edit)
    const [existingSyllabusUrl, setExistingSyllabusUrl] = useState(initialData?.syllabusUrl || null);

    const [faculty, setFaculty] = useState<string>(initialData?.faculty || "");
    const [category, setCategory] = useState<string>(initialData?.category || "");

        const [grading, setGrading] = useState<GradingComponents>(
        parseGradingStructure(initialData?.gradingStructure)
    );
    const [totalPercentage, setTotalPercentage] = useState(0);

    // Tự động tính tổng mỗi khi một cột điểm thay đổi
    useEffect(() => {
        const total = Object.values(grading).reduce((sum, value) => sum + (value || 0), 0);
        setTotalPercentage(total);
    }, [grading]);

    const handleGradeChange = (component: keyof GradingComponents, value: string) => {
        const numericValue = value === '' ? null : parseInt(value, 10);
        // Chỉ cập nhật nếu là số hợp lệ hoặc rỗng
        if (numericValue === null || (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100)) {
            setGrading(prev => ({ ...prev, [component]: numericValue }));
        }
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Nếu người dùng chọn file mới, lưu nó vào state
            setSyllabusFile(e.target.files[0]);
            // Đồng thời xóa link cũ đi
            setExistingSyllabusUrl(null); 
        }
    };

    const handleRemoveFile = () => {
        setSyllabusFile(null);
        setExistingSyllabusUrl(null);
        // Cần có cách để reset input file, cách đơn giản là dùng key
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ... (validation cấu trúc điểm giữ nguyên)
        alert(
            `Đã ${isEditMode ? 'cập nhật' : 'tạo mới'} môn học thành công!` +
            `\nKhoa quản lý: ${faculty}` +
            `\nPhân loại: ${category}`
        );
        if (onFinished) {
            onFinished();
        }
        // Nếu muốn giữ lại điều hướng cũ, có thể gọi router.push ở đây
        // router.push('/admin/courses');
        // router.refresh();
    }
    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>{isEditMode ? 'Chỉnh sửa môn học' : 'Tạo môn học mới'}</CardTitle>
                    {/* <CardDescription>
                        Điền đầy đủ các thông tin cần thiết.
                    </CardDescription> */}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="code">Mã môn học</Label>
                            <Input id="code" defaultValue={initialData?.code || ''} placeholder="Ví dụ: IT4440" required />
                        </div>
                        <div>
                            <Label htmlFor="name">Tên môn học</Label>
                            <Input id="name" defaultValue={initialData?.name || ''} placeholder="Ví dụ: Phát triển ứng dụng Web" required />
                        </div>
                    </div>
                    {/* --- TRƯỜNG MÔ TẢ (TEXT) --- */}
                    <div>
                        <Label htmlFor="description">Thông tin mô tả</Label>
                        <Textarea id="description" defaultValue={initialData?.description || ''} rows={5} placeholder="Mô tả ngắn gọn về nội dung, mục tiêu của môn học..." />
                    </div>
                    {/* --- SELECT KHOA PHỤ TRÁCH VÀ NHÓM MÔN HỌC*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="faculty">Khoa quản lý</Label>
                            <Select value={faculty} onValueChange={setFaculty} required>
                                <SelectTrigger id="faculty">
                                    <SelectValue placeholder="Chọn khoa quản lý..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {FACULTIES.map(f => (
                                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="category">Phân loại môn</Label>
                            <Select value={category} onValueChange={setCategory} required>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Chọn loại môn học..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {COURSE_CATEGORIES.map(c => (
                                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* --- TRƯỜNG TẢI FILE ĐỀ CƯƠNG (PDF) --- */}
                    <div>
                        <Label htmlFor="syllabus">Đề cương (tải lên file PDF)</Label>
                        {syllabusFile ? (
                             <div className="flex items-center justify-between p-2 mt-2 border rounded-md">
                                <div className="flex items-center gap-2 text-sm">
                                    <File className="h-4 w-4" />
                                    <span>{syllabusFile.name}</span>
                                </div>
                                <Button type="button" variant="ghost" size="icon" onClick={handleRemoveFile}>
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>
                        ) : existingSyllabusUrl ? (
                            <div className="flex items-center justify-between p-2 mt-2 border rounded-md">
                                <a href={existingSyllabusUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                    <File className="h-4 w-4" />
                                    <span>{existingSyllabusUrl.split('/').pop()}</span>
                                </a>
                                 <Button type="button" variant="ghost" size="icon" onClick={handleRemoveFile}>
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>
                        ) : (
                            <Input id="syllabus" type="file" accept=".pdf" onChange={handleFileChange} className="mt-2"/>
                        )}
                    </div>
                    {/* --- CÁC TRƯỜNG CÒN LẠI --- */}
                   <div>
                        <Label>Cấu trúc điểm</Label>
                        <div className="p-4 mt-2 border rounded-md grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <Label htmlFor="process" className="text-sm font-normal">Quá trình</Label>
                                <Input 
                                    id="process" 
                                    type="number" 
                                    min="0" max="100"
                                    placeholder="%" 
                                    value={grading.process ?? ''}
                                    onChange={(e) => handleGradeChange('process', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="practice" className="text-sm font-normal">Thực hành</Label>
                                <Input 
                                    id="practice" 
                                    type="number" 
                                    min="0" max="100"
                                    placeholder="%" 
                                    value={grading.practice ?? ''}
                                    onChange={(e) => handleGradeChange('practice', e.target.value)}
                                />
                            </div>
                             <div>
                                <Label htmlFor="midterm" className="text-sm font-normal">Giữa kỳ</Label>
                                <Input 
                                    id="midterm" 
                                    type="number" 
                                    min="0" max="100"
                                    placeholder="%" 
                                    value={grading.midterm ?? ''}
                                    onChange={(e) => handleGradeChange('midterm', e.target.value)}
                                />
                            </div>
                             <div>
                                <Label htmlFor="final" className="text-sm font-normal">Cuối kỳ</Label>
                                <Input 
                                    id="final" 
                                    type="number" 
                                    min="0" max="100"
                                    placeholder="%" 
                                    value={grading.final ?? ''}
                                    onChange={(e) => handleGradeChange('final', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-2 text-right text-sm">
                            <span className="text-muted-foreground">Tổng: </span>
                            <span className={cn(
                                "font-bold",
                                totalPercentage === 100 ? "text-green-600" : "text-red-600"
                            )}>
                                {totalPercentage}%
                            </span>
                            {totalPercentage !== 100 && totalPercentage > 0 && (
                                <p className="text-red-600 text-xs">Tổng phải bằng 100%</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                    Hủy
                </Button>
                <Button type="submit">
                    {isEditMode ? 'Lưu thay đổi' : 'Tạo môn học'}
                </Button>
            </div>
        </form>
    )
}