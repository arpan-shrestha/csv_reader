"use client";

import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserCsvById } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function UsersCsvsDetails({ id }: { id: string }) {
  const { data: csvDetails, isLoading } = useQuery({
    queryKey: ["csvDetails", id],
    queryFn: () => getUserCsvById(id),
    enabled: !!id,
  });

  const csvDetailsData = useMemo(() => {
    if (csvDetails?.data?.length && csvDetails?.data?.length > 0) {
      const first = csvDetails?.data[0];
      return {
        headers: Object.keys(first),
        data: csvDetails?.data,
      };
    }
    return {
      headers: [],
      data: [],
    };
  }, [csvDetails]);

  return (
    <>
      <Link href='/users/csvs' className='flex items-center gap-2 mb-4 text-sm'>
        <ArrowLeftIcon className='size-4' />
        Go Back to CSV List
      </Link>
      {isLoading && (
        <div className='flex justify-center my-4 items-center gap-2'>
          <Spinner />
          Loading CSV Details...
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {csvDetailsData?.headers?.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {csvDetailsData?.data?.map((csv, index) => {
            return (
              <TableRow key={`1st-${index}`}>
                {Object.keys(csv).map((value, _) => (
                  <TableCell key={`${index}-${value}`}>
                    <div className=''>{csv[value]}</div>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
