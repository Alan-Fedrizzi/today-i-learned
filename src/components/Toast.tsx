import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  state: "success" | "error";
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toast({ message, state, setShowToast }: ToastProps) {
  const [timeoutIds, setTimeoutIds] = useState<ReturnType<typeof setTimeout>[]>(
    []
  );
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    // First timeout
    const timeout1 = setTimeout(() => {
      setAnimate(false);
    }, 3_000);

    // Second timeout
    const timeout2 = setTimeout(() => {
      setShowToast(false);
    }, 3_300);

    // Store the timeout IDs
    setTimeoutIds([timeout1, timeout2]);

    // Cleanup function to clear both timeouts
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      setTimeoutIds([]);
    };
  }, [setShowToast]);

  return (
    <div className={`toast toast--${state} ${animate ? "toast--show" : ""}`}>
      {message}
    </div>
  );
}

export default Toast;
