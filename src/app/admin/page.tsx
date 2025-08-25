import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

export default function AdminAccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="mx-auto max-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Khu vực Quản trị</CardTitle>
          <CardDescription>
            Chức năng đăng nhập đang được tạm ẩn để phát triển.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" asChild className="w-full">
            <Link href="/admin/dashboard">
              <LogIn className="mr-2 h-5 w-5" />
              Vào trang Dashboard
            </Link>
          </Button>
           <div className="mt-4 text-center text-sm">
              <Link href="/" className="underline">
                Quay lại trang chủ
              </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}