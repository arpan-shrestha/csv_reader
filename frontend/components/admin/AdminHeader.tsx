import { cn } from "@/lib/utils";

type AdminHeaderProps = {
  title: string;
  className?: string;
  rightContent?: React.ReactNode;
};

export default function AdminHeader({
  title,
  className,
  rightContent,
}: AdminHeaderProps) {
  return (
    <div className={cn("mb-4 flex justify-between items-center", className)}>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <div>{rightContent}</div>
    </div>
  );
}
