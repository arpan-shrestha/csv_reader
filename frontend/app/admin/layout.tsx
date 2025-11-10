"use client";

import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const adminLinks = [
  {
    label: "Users",
    href: "/admin/users",
  },
  {
    label: "Manage CSV",
    href: "/admin/manage-csv",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.href = "/auth/sign-in";
  };

  return (
    <div>
      <div className='py-6 bg-blue-800 text-white px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-between items-center'>
            <h1 className='text-lg font-bold'>Admin Dashboard</h1>
            <nav className='flex items-center gap-6 text-sm'>
              {adminLinks.map((link) => (
                <div
                  className='flex items-center gap-2 hover:underline'
                  key={link.href}
                >
                  <span className='w-1 h-1 rounded-full bg-white' />
                  <Link href={link.href}>{link.label}</Link>
                </div>
              ))}
              <Button onClick={handleLogout} size='sm'>
                <LogOutIcon className='size-4 rotate-180' />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto py-4 px-4'>{children}</div>
    </div>
  );
}
