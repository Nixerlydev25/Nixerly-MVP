import { Toaster } from 'sonner';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      expand={false}
      richColors
      closeButton
      theme="light"
    />
  );
}; 