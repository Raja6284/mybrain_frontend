import { useState } from "react";
import { Button } from "../components/Button"
import { PlusIcon } from "../components/icons/PlusIcon"
import { ShareIcon } from "../components/icons/ShareIcon"
import Card from '../components/Card';
import { CreateContentModel } from "../components/CreateContentModel";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "./hooks/useContent";


export default function Dashboard(){
    
    const [contentCreatePop, setContentCreatePop] = useState(false)
    const contents =useContent()

  return (
    <>
      <div className="">

      <div>
        <Sidebar/>
      </div>

      <div className="p-4 ml-50 ">
        <CreateContentModel open={contentCreatePop} onClose={() => { setContentCreatePop(false) }} />
        <div className="flex justify-end gap-4  ">
          <Button onClick={()=>{setContentCreatePop(true)}} variant="primary" text="Add Content" startIcon={<PlusIcon />}></Button>
          <Button variant="secondary" text="Share" startIcon={<ShareIcon />}></Button>

        </div>

        <div className="flex gap-2 mt-4">

          {contents.map(({link,type,title})=> <Card link={link} type={type} title={title} />)}
        </div>
      </div>

      </div>

    </>
  )
}