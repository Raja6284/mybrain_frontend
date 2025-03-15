// import { ReactElement } from "react";

// interface buttonVariant{
//     variant:"primary" | "secondary" ,
//     text:string,
//     startIcon?:ReactElement,
//     onClick?: () => void,
// }



// const colorVariant ={
//     "primary":"bg-purple-500 text-white",
//     "secondary":"bg-purple-300 text-white"
// }

// const defaultProperty = "border-1 rounded px-3 py-2 flex items-center justify-center font-medium cursor-pointer"

// export function Button(props:buttonVariant){
     
//     return (
//         <div>
//             <button
//                 onClick={props.onClick}
//             className={`${colorVariant[props.variant]} ${defaultProperty} `}>
//                 <div className="pr-1 ">
//                 {props.startIcon}
//                 </div>
//                 {props.text}
                
                
//                 </button>

//         </div>
//     )
// }





import { ReactElement } from "react";

interface buttonVariant{
    variant: "primary" | "secondary",
    text: string,
    startIcon?: ReactElement,
    onClick?: () => void,
    fullWidth?: boolean,
    size?: "small" | "medium" | "large",
}

const colorVariant = {
    "primary": "bg-purple-500 hover:bg-purple-600 text-white",
    "secondary": "bg-purple-300 hover:bg-purple-400 text-white"
}

const sizeVariant = {
    "small": "px-2 py-1 text-sm",
    "medium": "px-3 py-2",
    "large": "px-4 py-3 text-lg"
}

export function Button({
    variant = "primary",
    text,
    startIcon,
    onClick,
    fullWidth = true,
    size = "medium"
}: buttonVariant) {
    const baseClasses = "rounded flex items-center justify-center font-medium cursor-pointer transition-colors duration-200 ease-in-out";
    
    return (
        <button
            onClick={onClick}
            className={`
                ${colorVariant[variant]} 
                ${sizeVariant[size]}
                ${baseClasses}
                ${fullWidth ? 'w-full' : ''}
            `}
        >
            {startIcon && (
                <span className="mr-2 flex items-center">
                    {startIcon}
                </span>
            )}
            <span>{text}</span>
        </button>
    )
}