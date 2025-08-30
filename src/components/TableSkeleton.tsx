import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]"><Skeleton className="h-4 w-full" /></TableHead>
            <TableHead><Skeleton className="h-4 w-full" /></TableHead>
            <TableHead><Skeleton className="h-4 w-full" /></TableHead>
            <TableHead><Skeleton className="h-4 w-full" /></TableHead>
            <TableHead className="hidden md:table-cell text-center"><Skeleton className="h-4 w-full" /></TableHead>
            <TableHead className="hidden md:table-cell text-center"><Skeleton className="h-4 w-full" /></TableHead>
            <TableHead className="text-right"><Skeleton className="h-4 w-20" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-8 w-20" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}