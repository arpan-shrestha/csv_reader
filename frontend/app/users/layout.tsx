"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Cookies from "js-cookie";
import React, { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.href = "/auth/sign-in";
  };

  const userName = useMemo(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      const decoded = jwtDecode(authToken) as { username: string };
      return decoded?.username;
    }
    return undefined;
  }, []);

  return (
    <div>
      <div className='py-6 bg-blue-800 text-white px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-between items-center'>
            <h1 className='text-lg font-bold'>{userName}</h1>
            <nav className='flex items-center gap-6 text-sm'>
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
