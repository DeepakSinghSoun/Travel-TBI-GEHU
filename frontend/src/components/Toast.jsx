import { useEffect } from "react";

function Toast({ message, type = "success", show, onClose }) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  const bgColor = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition ${bgColor[type]}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="font-bold">
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;