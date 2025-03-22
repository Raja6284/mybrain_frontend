

// import { ReactElement } from "react";

// interface buttonVariant{
//     variant: "primary" | "secondary",
//     text: string,
//     startIcon?: ReactElement,
//     onClick?: () => void,
//     fullWidth?: boolean,
//     size?: "small" | "medium" | "large",
// }

// const colorVariant = {
//     "primary": "bg-purple-500 hover:bg-purple-600 text-white",
//     "secondary": "bg-purple-300 hover:bg-purple-400 text-white"
// }

// const sizeVariant = {
//     "small": "px-2 py-1 text-sm",
//     "medium": "px-3 py-2",
//     "large": "px-4 py-3 text-lg"
// }

// export function Button({
//     variant = "primary",
//     text,
//     startIcon,
//     onClick,
//     fullWidth = true,
//     size = "medium"
// }: buttonVariant) {
//     const baseClasses = "rounded flex items-center justify-center font-medium cursor-pointer transition-colors duration-200 ease-in-out";
    
//     return (
//         <button
//             onClick={onClick}
//             className={`
//                 ${colorVariant[variant]} 
//                 ${sizeVariant[size]}
//                 ${baseClasses}
//                 ${fullWidth ? 'w-full' : ''}
//             `}
//         >
//             {startIcon && (
//                 <span className="mr-2 flex items-center">
//                     {startIcon}
//                 </span>
//             )}
//             <span>{text}</span>
//         </button>
//     )
// }





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
  primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-sm",
  secondary: "bg-purple-100 hover:bg-purple-200 text-purple-700",
  outline: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300",
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
  const baseClasses = "rounded-lg font-medium flex items-center justify-center transition-all duration-200 ease-in-out"

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





