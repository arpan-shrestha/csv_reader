import { Spinner } from "./ui/spinner";

export default function LoadingComponent({ text }: { text?: string }) {
  return (
    <div className='flex gap-2 items-center justify-center min-h-[60vh]'>
      <span className='text-center text-title-medium font-bold text-background-onBackgroundVariant'>
        {text || "Processing"}
      </span>
      <Spinner className='size-4' />
    </div>
  );
}
