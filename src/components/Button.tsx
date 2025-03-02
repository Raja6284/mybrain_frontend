import { ReactElement } from "react";

interface buttonVariant{
    variant:"primary" | "secondary" ,
    text:string,
    startIcon?:ReactElement,
    onClick?: () => void,
}



const colorVariant ={
    "primary":"bg-purple-500 text-white",
    "secondary":"bg-purple-300 text-white"
}

const defaultProperty = "border-1 rounded px-3 py-2 flex items-center justify-center font-medium cursor-pointer"

export function Button(props:buttonVariant){
     
    return (
        <div>
            <button
                onClick={props.onClick}
            className={`${colorVariant[props.variant]} ${defaultProperty} `}>
                <div className="pr-1 ">
                {props.startIcon}
                </div>
                {props.text}
                
                
                </button>

        </div>
    )
}