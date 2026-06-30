function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
}) {
  const base = "px-5 py-2 rounded-lg font-medium transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${
        disabled
          ? "bg-gray-400 text-white cursor-not-allowed"
          : variants[variant]
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;