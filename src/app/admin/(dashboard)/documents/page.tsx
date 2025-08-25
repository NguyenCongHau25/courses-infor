'use client'; // Cần client component để xử lý các nút

import { MOCK_DOCUMENTS } from "@/lib/mockdata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, CheckCircle, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function AdminDocumentsPage() {

  const handleApprove = (docId: string) => {
    alert(`Đã duyệt tài liệu ID: ${docId}. (Logic thật sẽ gọi API)`);
    // Logic thật sẽ cập nhật lại state của trang
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Tài liệu</h1>
          {/* <p className="text-muted-foreground">Duyệt, sửa, xóa các tài liệu trong hệ thống.</p> */}
        </div>
        <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" /> Thêm tài liệu (sẽ được phát triển sau)
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
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
              {MOCK_DOCUMENTS.map((doc) => (
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
                        <DropdownMenuItem>Sửa</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}