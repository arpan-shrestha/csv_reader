import React from "react";
import { Input } from "./ui/input";

type FileUploadFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function FileUploadField({ ...props }: FileUploadFieldProps) {
  return <Input type='file' {...props} />;
}
