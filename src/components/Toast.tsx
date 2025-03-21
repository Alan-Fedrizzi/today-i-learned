import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  state: "success" | "error";
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toast({ message, state, setShowToast }: ToastProps) {
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setShowToast(false);
    }, 3_000);

    setTimeoutId(id);

    // Cleanup function to clear the timeout when component unmounts
    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [setShowToast]);

  return <div className={`toast toast--${state}`}>{message}</div>;
}

export default Toast;
