interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-red-950/30 border border-red-900/50 text-red-400 px-6 py-4 rounded-lg">
        <p className="font-medium">Error</p>
        <p className="text-sm mt-1">{message}</p>
      </div>
    </div>
  );
};
