'use client'; 

import Link from "next/link";
import { useState, useMemo } from "react";
import { MOCK_DOCUMENTS } from "@/lib/mockdata";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, CheckCircle, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminDocument } from "@/lib/mockdata"; 

type FilterStatus = "all" | "approved" | "pending";

export default function AdminDocumentsPage() {
  const [filter, setFilter] = useState<FilterStatus>("all");

  const handleApprove = (docId: string) => {
    alert(`Đã duyệt tài liệu ID: ${docId}. (Logic thật sẽ gọi API)`);
    // Trong ứng dụng thật, bạn sẽ gọi API và refetch lại data
  };

  // Sử dụng useMemo để tối ưu hóa việc lọc, chỉ tính toán lại khi filter hoặc MOCK_DOCUMENTS thay đổi
  const filteredDocuments = useMemo(() => {
    if (filter === "approved") {
      return MOCK_DOCUMENTS.filter(doc => doc.isApproved);
    }
    if (filter === "pending") {
      return MOCK_DOCUMENTS.filter(doc => !doc.isApproved);
    }
    return MOCK_DOCUMENTS;
  }, [filter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Tài liệu</h1>
          {/* <p className="text-muted-foreground">Duyệt, sửa, xóa các tài liệu trong hệ thống.</p> */}
        </div>
        <Button asChild>
          <Link href="/admin/documents/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Thêm tài liệu
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* ----- BỘ LỌC TABS ----- */}
          <div className="flex justify-end mb-4">
            <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterStatus)}>
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="pending">Chờ duyệt</TabsTrigger>
                <TabsTrigger value="approved">Đã duyệt</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {/* ----- KẾT THÚC BỘ LỌC ----- */}

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên tài liệu</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Môn học</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc: AdminDocument) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.course.name} ({doc.course.code})</TableCell>
                      <TableCell>
                        <Badge variant={doc.isApproved ? "default" : "secondary"}>
                          {doc.isApproved 
                            ? <><CheckCircle className="mr-1 h-3 w-3" /> Đã duyệt</> 
                            : <><Clock className="mr-1 h-3 w-3" /> Chờ duyệt</>
                          }
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!doc.isApproved && (
                              <DropdownMenuItem onClick={() => handleApprove(doc.id)}>
                                Duyệt tài liệu
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/documents/edit/${doc.id}`}>Sửa</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Không có tài liệu nào phù hợp với bộ lọc.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}