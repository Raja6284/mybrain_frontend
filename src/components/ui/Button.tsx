import { ReactElement } from "react"

export interface ButtonProps{
    variant: "primary" | "secondary",
    size : "sm" | "md" | "lg" ,
    text : string,
    startIcon?: ReactElement,
    endIcon? : ReactElement,
    onClick?: ()=>void
}

const sizeVariant = {
    "lg" : "px-8 py-4 text-xl",
    "md" : "px-4 py-2 text-md",
    "sm" : "px-2 py-1 text-sm"
}

const colorVariant = {
    "primary" : "bg-red-500",
    "secondary" : "bg-orange-400"
}

export const Button = (props:ButtonProps) =>{
    return(
        <>
            <button className={`${colorVariant[props.variant]} ${sizeVariant[props.size]}`}>{props.text}</button>
        </>
    )
}


