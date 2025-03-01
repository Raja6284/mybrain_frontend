import { useState } from "react";
import { Button } from "../components/Button"
import { PlusIcon } from "../components/icons/PlusIcon"
import { ShareIcon } from "../components/icons/ShareIcon"
import Card from '../components/Card';
import { CreateContentModel } from "../components/CreateContentModel";
import { Sidebar } from "../components/Sidebar";


export default function Dashboard(){
    
    const [contentCreatePop, setContentCreatePop] = useState(false)

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
          <Card link="https://x.com/wyckoffweb/status/1895439430141329663" type="twitter" title="Boost your pi network mining" />

          <Card link="https://www.youtube.com/watch?v=Ym4ti89tItw" type="youtube" title="Yung DSA song" />

          <Card link="https://www.youtube.com/watch?v=SfsaNZJ08Xs" type="youtube" title="Trumb Vs Zelensky in White House" />
        </div>
      </div>

      </div>


    </>
  )
}