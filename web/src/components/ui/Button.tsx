import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors rounded-lg outline-none";

  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800",
    secondary: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    outline:
      "border border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost: "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
