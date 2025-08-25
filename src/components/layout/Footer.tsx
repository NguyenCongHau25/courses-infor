export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} UIT - CourseInfo. All rights reserved.</p>
        <p className="mt-1">Một sản phẩm dành cho cộng đồng sinh viên.</p>
      </div>
    </footer>
  );
}