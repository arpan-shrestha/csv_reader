import React, { useState } from "react";
import InputField from "./InputField";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type PasswordFieldProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordField({
  label = "Password",
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='relative'>
      <InputField
        label={label}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <button
        className='absolute right-3 top-8 cursor-pointer'
        onClick={(e) => {
          e.preventDefault();
          setShowPassword(!showPassword);
        }}
      >
        {!showPassword ? (
          <EyeOffIcon className='size-4' />
        ) : (
          <EyeIcon className='size-4' />
        )}
      </button>
    </div>
  );
}
