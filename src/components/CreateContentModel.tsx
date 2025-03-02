import { CrossIcon } from "./icons/CrossIcon"
import { Button } from './Button';
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

//also implement when you click outside the span(input whole box) it closes..

enum contentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModel({ open, onClose }) {

    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)

    const [type, setType] = useState(contentType.Youtube)

    async function handleCreateContent(){

        const title = titleRef.current?.value
        const link = linkRef.current?.value

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            "link":link,
            "title":title,
            "type":type
        },{
            headers:{
                "Authorization" : localStorage.getItem("token")
            }
        })

        alert("your content added")
    }


    return (
        <div >

            {open &&
                <div>
                    <div className="w-screen h-screen fixed top-0 left-0 bg-slate-700 opacity-60 flex justify-center ">
                    </div>

                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center ">
                        <div className="flex  flex-col justify-center">
                            <span className="bg-white opacity-100 p-2 rounded">
                                <div className="flex justify-end pr-2">
                                    <div onClick={onClose} className="cursor-pointer">
                                        <CrossIcon />
                                    </div>

                                </div>
                                <div>
                                    <Input reference={titleRef} placeholder={"Title"} />
                                    <Input reference={linkRef} placeholder={"Link"} />
                                </div>
                                <div className="ml-2 font-semibold text-gray-500">
                                    Choose the type
                                </div>
                                <div className="flex justify-center gap-2">
                                    <Button text="Youtube" variant={type == contentType.Youtube ? "primary" : "secondary"} onClick={()=>{setType(contentType.Youtube)}}/>

                                    <Button text="Twitter" variant={type == contentType.Twitter ? "primary" : "secondary"} onClick={()=>{setType(contentType.Twitter)}}/>
                                </div>

                                <div className="flex justify-center mt-2 ">
                                    <Button variant="primary" text="Submit" onClick={handleCreateContent} />
                                </div>
                            </span>
                        </div>
                    </div>

                </div>
            }

        </div>
    )
}

interface inputProps {
    placholder: string,
    ref?: any
}


export function Input({ reference, placeholder }: inputProps) {

    return (
        <div>
            <input type={"text"} placeholder={placeholder} ref={reference} className="px-4 py-2 border rounded m-2" />
        </div>
    )
}