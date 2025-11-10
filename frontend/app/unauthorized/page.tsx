import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export default async function UnauthorizedPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  let role = undefined;
  if (authToken) {
    const decoded = jwtDecode(authToken?.value) as { role: string };
    role = decoded?.role;
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-2'>
      <h2 className='text-4xl font-bold'>401</h2>
      <p>You are not authorized to access this page</p>
      <Link
        className={cn(buttonVariants({ variant: "default", size: "default" }))}
        href={
          role === "admin"
            ? "/admin/users"
            : role === "user"
            ? "/users/csvs"
            : "/auth/sign-in"
        }
      >
        Go Back
      </Link>
    </div>
  );
}
