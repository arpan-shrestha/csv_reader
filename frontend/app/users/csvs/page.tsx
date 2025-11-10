"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsersCsvs } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tableHeaders = ["Name", "Upload Date", "Action"];

export default function UsersCsvsPage() {
  const router = useRouter();

  const { data: csvData, isLoading } = useQuery({
    queryKey: ["csvs"],
    queryFn: () => getUsersCsvs(),
    retry: 2,
  });

  return (
    <div>
      {isLoading && (
        <div className='flex justify-center my-4 items-center gap-2'>
          <Spinner />
          Loading CSV List...
        </div>
      )}
      <Table>
        <TableCaption>A list of uploaded csv files.</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {csvData?.data?.map((csv) => (
            <TableRow key={csv.id}>
              <TableCell key={csv.id}>{csv.filename}</TableCell>
              <TableCell>
                {new Date(csv.upload_time).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  size='icon-sm'
                  variant='outline'
                  onClick={() => {
                    router.push(`/users/csvs/${csv.id}`);
                  }}
                >
                  <EyeIcon className='size-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
