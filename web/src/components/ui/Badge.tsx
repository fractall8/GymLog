import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "warmup" | "failure" | "outline";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const variants = {
    default: "bg-zinc-100 text-zinc-700",
    secondary: "bg-blue-50 text-blue-700",
    warmup: "bg-sky-50 text-sky-600",
    failure: "bg-red-50 text-red-600",
    outline: "border border-zinc-200 text-zinc-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
