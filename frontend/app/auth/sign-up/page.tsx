"use client";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { createUser } from "@/services/users";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type User = {
  username: string;
  password: string;
};

export default function SignUpPage() {
  const [credentials, setCredentials] = useState<User>({
    username: "",
    password: "",
  });
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (user: User) => {
      const response = await createUser(user);
      return response;
    },
    onSuccess: () => {
      router.push("/auth/sign-in");
    },
    onError: () => {
      // toast.error("Failed to create user");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(credentials);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container mx-auto max-w-md flex h-screen justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='border border-gray-200 w-full rounded p-6 flex flex-col space-y-4 justify-center'
      >
        <h2 className='mb-6 font-bold text-xl'>Sign Up</h2>
        <InputField
          label='Username'
          placeholder='Enter your username'
          value={credentials.username}
          onChange={handleChange}
          name='username'
          disabled={isPending}
        />
        <PasswordField
          value={credentials.password}
          onChange={handleChange}
          name='password'
          placeholder='Enter your password'
          disabled={isPending}
        />
        <Button disabled={isPending}>
          {isPending ? <Spinner /> : "Sign up"}
        </Button>

        <p className='text-sm flex items-center gap-1'>
          Already have an account?
          <Link href='/auth/sign-in' className='hover:underline text-blue-500'>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
