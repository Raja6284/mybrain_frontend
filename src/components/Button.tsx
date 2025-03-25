

"use client"

import type { ReactElement } from "react"

interface ButtonProps {
  variant: "primary" | "secondary" | "outline"
  text: string
  startIcon?: ReactElement
  onClick?: () => void
  fullWidth?: boolean
  size?: "small" | "medium" | "large"
  disabled?: boolean
}

const colorVariant = {
  primary: "bg-black hover:bg-gray-900 text-white shadow-sm",
  secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
  outline: "bg-transparent hover:bg-gray-900 text-white border border-gray-700",
}

const sizeVariant = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2",
  large: "px-5 py-3 text-lg",
}

export function Button({
  variant = "primary",
  text,
  startIcon,
  onClick,
  fullWidth = false,
  size = "medium",
  disabled = false,
}: ButtonProps) {
  const baseClasses = "rounded-md font-medium flex items-center justify-center transition-all duration-200 ease-in-out"

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${colorVariant[variant]} 
        ${sizeVariant[size]}
        ${baseClasses}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      <span>{text}</span>
    </button>
  )
}




