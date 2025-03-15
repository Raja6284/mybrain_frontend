// import { useEffect, useState } from "react";
// import { Button } from "../components/Button"
// import { PlusIcon } from "../components/icons/PlusIcon"
// import { ShareIcon } from "../components/icons/ShareIcon"
// import Card from '../components/Card';
// import { CreateContentModel } from "../components/CreateContentModel";
// import { Sidebar } from "../components/Sidebar";
// import { useContent } from "./hooks/useContent";
// import axios from "axios";
// import { BACKEND_URL } from "../../config";


// export default function Dashboard(){
    
//     const [contentCreatePop, setContentCreatePop] = useState(false)
//     const {contents,refresh} =useContent()

//     useEffect(()=>{
//       refresh()
//     },[contentCreatePop])

    
//   //   const getContentIds = () => {
//   //     return contents.map((content) => content._id);
//   // };


//     async function handleShareContent(){

//       const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
//         share:true
//       },{
//         headers:{
//           "Authorization": localStorage.getItem("token")
//         }
//       })

//       console.log(response)
//       console.log(response.data.hash)

//       const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`
//       console.log(shareUrl)
//       window.navigator.clipboard.writeText(shareUrl)

//     }

//   return (
//     <>
//       <div className="">

//       <div>
//         <Sidebar/>
//       </div>

//       <div className="p-4 ml-50 ">
//         <CreateContentModel open={contentCreatePop} onClose={() => { setContentCreatePop(false) }} />
//         <div className="flex justify-end gap-4  ">
//           <Button onClick={()=>{setContentCreatePop(true)}} variant="primary" text="Add Content" startIcon={<PlusIcon />}></Button>

//           <Button onClick={handleShareContent} variant="secondary" text="Share" startIcon={<ShareIcon />}></Button>

//         </div>

//         <div className="flex gap-2 mt-4 flex-wrap">

//           {/* {contents.map(({link,type,title})=> <Card link={link} type={type} title={title} />)} */}
//           {contents.map((c)=> <Card content={c} />)}

//         </div>
//       </div>
          

//       </div>

//     </>
//   )
// }





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
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const {contents, refresh} = useContent()

    useEffect(() => {
        refresh()
    }, [contentCreatePop])

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarOpen && window.innerWidth < 1024) {
                // Check if click is outside sidebar
                const sidebarElement = document.querySelector('.sidebar');
                const hamburgerButton = document.querySelector('.hamburger-button');
                
                if (sidebarElement && 
                    !sidebarElement.contains(event.target) && 
                    hamburgerButton && 
                    !hamburgerButton.contains(event.target)) {
                    setSidebarOpen(false);
                }
            }
        }

        if (sidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [sidebarOpen]);

    async function handleShareContent(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })

            const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`
            window.navigator.clipboard.writeText(shareUrl)
            alert("Share URL copied to clipboard!")
        } catch (error) {
            console.error("Error sharing content:", error)
            alert("Failed to generate share link")
        }
    }

    return (
        <>
            <div className="relative min-h-screen bg-gray-50">
                {/* Mobile sidebar overlay */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}
                
                {/* Mobile sidebar toggle */}
                <div className="lg:hidden fixed top-4 left-4 z-20">
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="hamburger-button p-2 rounded-md bg-purple-500 text-white"
                    >
                        {sidebarOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                </div>

                {/* Main content */}
                <div className="w-full lg:pl-64 p-4">
                    <CreateContentModel open={contentCreatePop} onClose={() => { setContentCreatePop(false) }} />
                    
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mb-6 mt-12 lg:mt-4">
                        <Button 
                            onClick={() => {setContentCreatePop(true)}} 
                            variant="primary" 
                            text="Add Content" 
                            startIcon={<PlusIcon />}
                        />
                        <Button 
                            onClick={handleShareContent} 
                            variant="secondary" 
                            text="Share" 
                            startIcon={<ShareIcon />}
                        />
                    </div>

                    {contents.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No content yet. Click "Add Content" to get started!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {contents.map((c) => (
                                <Card key={c._id} content={c} onDelete={refresh} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}