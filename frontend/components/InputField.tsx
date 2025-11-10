import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type InputFieldProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div className='flex flex-col space-y-2'>
      {label && <Label>{label}</Label>}
      <Input {...props} />
    </div>
  );
}
