"use client";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import { Button } from "@/components/ui/button";
import { signIn } from "@/services/users";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "@/components/ui/spinner";

export default function SignInPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await signIn(credentials);
      return response;
    },
    onSuccess: (res) => {
      if (res?.access_token?.access_token) {
        const accessToken = res?.access_token?.access_token;
        Cookies.set("authToken", accessToken);
        const decoded = jwtDecode(accessToken) as { role: string };

        if (decoded?.role === "admin") {
          window.location.href = "/admin/users";
        } else {
          window.location.href = "/users/csvs";
        }
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(credentials);
    // router.push("/admin/users");
  };

  return (
    <div className='container mx-auto max-w-md flex h-screen justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='border border-gray-200 w-full rounded p-6 flex flex-col space-y-4 justify-center'
      >
        <h2 className='mb-6 font-bold text-xl'>Sign In</h2>
        <InputField
          label='Username'
          type='username'
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
        <Button type='submit' disabled={isPending}>
          {isPending ? <Spinner /> : "Sign In"}
        </Button>

        <p className='text-sm flex items-center gap-1'>
          Don&apos;t have an account?
          <Link href='/auth/sign-up' className='hover:underline text-blue-500'>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
