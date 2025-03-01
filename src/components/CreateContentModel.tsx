import { CrossIcon } from "./icons/CrossIcon"
import { Button } from './Button';


//also implement when you click outside the span(input whole box) it closes..

export function CreateContentModel({ open, onClose }) {

    return (
        <div >
            { open && <div className="w-screen h-screen fixed top-0 left-0 bg-slate-700 opacity-60 flex justify-center ">
                <div className="flex  flex-col justify-center">
                    <span className="bg-white opacity-100 p-2 rounded">
                        <div className="flex justify-end pr-2">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>

                        </div>
                        <div>
                            <Input placeholder={"Type"} />
                            <Input placeholder={"Title"} />
                            <Input placeholder={"Link"} />
                        </div>

                        <div className="flex justify-center">
                            <Button variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>
            </div>
            }
        </div>
    )
}

interface inputProps{
    placholder:string,
    ref?:any
}


export function Input({ reference, placeholder }: inputProps) {

    return (
        <div>
            <input type={"text"} placeholder={placeholder} ref={reference} className="px-4 py-2 border rounded m-2"  />
        </div>
    )
}