"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import FileUploadField from "@/components/FileUploadField";
import LoadingComponent from "@/components/Loading";
import Modal from "@/components/Modal";
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
import { deleteCsv, getAllCsv, uploadCsv } from "@/services/csv";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TableCellsMerge, TrashIcon, UploadIcon } from "lucide-react";
import { useState } from "react";

const mockCsvData = [
  {
    id: 1,
    name: "CSV 1",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "CSV 2",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "CSV 3",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "CSV 4",
    createdAt: new Date(),
  },
];

const tableHeaders = ["Name", "Upload Date", "Action"];

export default function AdminManageCsvPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [selectedCsv, setSelectedCsv] = useState<string | null>(null);
  const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);

  const {
    data: csvData,
    isLoading,
    refetch: refetchCsvData,
  } = useQuery({
    queryKey: ["csvData"],
    queryFn: () => getAllCsv(),
    refetchOnWindowFocus: false,
  });

  const { mutate: uploadCsvMutation, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => uploadCsv(file),
    onSuccess: () => {
      setFile(null);
      setIsModalOpen(false);
      refetchCsvData();
    },
  });

  const { mutate: deleteCsvMutation, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteCsv(selectedCsv!),
    onSuccess: () => {
      setSelectedCsv(null);
      setIsDeletingModalOpen(false);
      refetchCsvData();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadCsvMutation(formData as unknown as File);
    }
  };

  const handleConfirmDelete = () => {
    deleteCsvMutation();
  };

  return (
    <div>
      <AdminHeader
        title='Manage CSV'
        rightContent={
          <Button variant='outline' onClick={() => setIsModalOpen(true)}>
            <UploadIcon className='size-4' />
            Upload CSV
          </Button>
        }
      />
      <Table>
        <TableCaption>A list of your recent uploaded csv files.</TableCaption>
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
                  variant='destructive'
                  onClick={() => {
                    setSelectedCsv(csv.id);
                    setIsDeletingModalOpen(true);
                  }}
                >
                  <TrashIcon className='size-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/** Upload CSV Modal */}
      <Modal
        title='Upload CSV'
        description='Upload a new csv file to the database.'
        open={isModalOpen}
        setOpen={setIsModalOpen}
        content={
          <>
            <FileUploadField onChange={handleFileChange} />
            {isUploading && (
              <div className='flex gap-1 items-center justify-center text-sm mt-2'>
                <Spinner />
                Uploading
              </div>
            )}
          </>
        }
      />
      {/** Delete CSV Modal */}
      <Modal
        title='Delete CSV'
        open={isDeletingModalOpen}
        setOpen={setIsDeletingModalOpen}
        description='Are you sure you want to delete this csv file? You cannot undo this action.'
        content={
          <>
            <div className='flex space-x-2 justify-end'>
              <Button
                variant='outline'
                size='sm'
                disabled={isDeleting}
                onClick={() => {
                  setIsDeletingModalOpen(false);
                  setSelectedCsv(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                size='sm'
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                Delete
              </Button>
            </div>
            {isDeleting && (
              <div className='flex gap-1 items-center justify-center text-sm mt-2'>
                <Spinner />
                Deleting
              </div>
            )}
          </>
        }
      />
    </div>
  );
}
