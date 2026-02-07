import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-xl flex items-start gap-3 max-w-md">
        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-[14px] font-semibold">Something went wrong</p>
          <p className="text-[13px] mt-1 text-red-600/80">{message}</p>
        </div>
      </div>
    </div>
  );
};
