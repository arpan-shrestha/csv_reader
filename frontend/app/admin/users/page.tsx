"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import {
  Table,
  TableHead,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/Modal";
import { deleteUser, getAllUsers } from "@/services/users";
import { useMutation, useQuery } from "@tanstack/react-query";

const tableHeaders = ["Name", "Role"];

export default function AdminUsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | string>(null);

  const { data: users, refetch: refetchUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
    retry: 2,
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(selectedUser as string),
    onSuccess: () => {
      refetchUsers();
      setSelectedUser(null);
      setIsModalOpen(false);
    },
  });

  const handleOpenModal = (selectedUser: string) => {
    setSelectedUser(selectedUser);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate();
  };

  return (
    <div>
      <AdminHeader title='Users' />
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  size='icon-sm'
                  variant='destructive'
                  disabled={user.role === "admin"}
                  onClick={() => handleOpenModal(user.username)}
                >
                  <TrashIcon className='size-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/** Delete User Modal */}
      <Modal
        title='Delete User'
        open={isModalOpen}
        setOpen={setIsModalOpen}
        description='Are you sure you want to delete this user? You cannot undo this action.'
        content={
          <div className='flex space-x-2 justify-end'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                setIsModalOpen(false);
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              size='sm'
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </div>
        }
      />
    </div>
  );
}
