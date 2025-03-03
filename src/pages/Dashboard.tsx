import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { PlusIcon } from "../components/icons/PlusIcon"
import { ShareIcon } from "../components/icons/ShareIcon"
import Card from '../components/Card';
import { CreateContentModel } from "../components/CreateContentModel";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "./hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../../config";


export default function Dashboard(){
    
    const [contentCreatePop, setContentCreatePop] = useState(false)
    const {contents,refresh} =useContent()

    useEffect(()=>{
      refresh()
    },[contentCreatePop])

    
  //   const getContentIds = () => {
  //     return contents.map((content) => content._id);
  // };


    async function handleShareContent(){

      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
        share:true
      },{
        headers:{
          "Authorization": localStorage.getItem("token")
        }
      })

      console.log(response)
      console.log(response.data.hash)

      const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`
      console.log(shareUrl)
      window.navigator.clipboard.writeText(shareUrl)

    }

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

          <Button onClick={handleShareContent} variant="secondary" text="Share" startIcon={<ShareIcon />}></Button>

        </div>

        <div className="flex gap-2 mt-4 flex-wrap">

          {/* {contents.map(({link,type,title})=> <Card link={link} type={type} title={title} />)} */}
          {contents.map((c)=> <Card content={c} />)}

        </div>
      </div>

      </div>

    </>
  )
}