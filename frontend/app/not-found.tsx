"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-2'>
      <h2 className='text-4xl font-bold'>404</h2>
      <p>Could not find requested resource</p>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
}
