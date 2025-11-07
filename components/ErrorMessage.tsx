
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-center bg-error/10 text-error p-6 rounded-lg border border-error">
      <p className="text-2xl font-bold mb-2">⚠</p>
      <p className="font-semibold">오류 발생</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
