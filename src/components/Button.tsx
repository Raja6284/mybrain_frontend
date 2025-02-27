import { ReactElement } from "react";

interface buttonVariant{
    variant:"primary" | "secondary" ,
    text:string,
    startIcon:ReactElement
}

const colorVariant ={
    "primary":"bg-purple-500 text-white",
    "secondary":"bg-purple-300 text-white"
}

const defaultProperty = "border-1 rounded px-3 py-2 flex items-center justify-center font-medium"

export function Button(props:buttonVariant){
     
    return (
        <div>
            <button className={`${colorVariant[props.variant]} ${defaultProperty} `}>
                <div className="pr-0.5 ">
                {props.startIcon}
                </div>
                {props.text}
                
                
                </button>

        </div>
    )
}