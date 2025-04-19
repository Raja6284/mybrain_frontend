

// import { DeleteIcon } from "./icons/DeleteIcon"
// import { YoutubeIcon } from "./icons/YoutubeIcon"
// import { TwitterIcon } from "./icons/TwitterIcon"
// import axios from "axios"
// import { BACKEND_URL } from "../../config"
// import InstaIcon from "./icons/Instagram"
// import type { ReactElement } from "react"
// import { TextIcon } from "./icons/TextIcon"
// import { LinkIcon } from "./icons/LinkIcon"
// import CodeIcon from "./icons/CodeIcon"
// import EditIcon from "./icons/EditIcon"
// import { useState } from "react"
// import { EditContentModal } from "./EditContentModal"


// interface Content {
//   _id: string
//   link: string
//   type:
//   | "youtube"
//   | "twitter"
//   | "linkedin"
//   | "instagram"
//   | "document"
//   | "text"
//   | "image"
//   | "code"
//   | "email"
//   | "randomLink"
//   title: string
//   text?: string
//   imageUrl?: string
//   fileUrl?: string
// }

// const iconMap: Record<string, ReactElement> = {
//   youtube: <YoutubeIcon />,
//   twitter: <TwitterIcon />,
//   instagram: <InstaIcon />,
//   text: <TextIcon />,
//   randomLink:<LinkIcon/>,
//   code : <CodeIcon/>
// }

// interface CardProps {
//   content: Content
//   onDelete?: () => void
//   onUpdate?: (updatedContent: Content) => void
// }

// export default function Card({ content, onDelete, onUpdate }: CardProps) {
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)

//   let youtubevidId = ""
//   let instaLink = ""

//   if (content.type === "instagram") {
//     instaLink = content.link.split("?")[0] + "?utm_source=ig_embed&amp;utm_campaign=loading"
//   }

//   if (content.type === "youtube") {
//     // Handle different YouTube URL formats
//     if (content.link.includes("?v=")) {
//       youtubevidId = content.link.split("?v=")[1].split("&")[0]
//     } else if (content.link.includes("youtu.be/")) {
//       youtubevidId = content.link.split("youtu.be/")[1].split("?")[0]
//     }
//   }

//   const youtubeLink = "https://www.youtube.com/embed/" + youtubevidId

//   async function deleteContent(contentId: string) {
//     try {
//       await axios.delete(`${BACKEND_URL}/api/v1/content`, {
//         data: { contentId },
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       })
//       console.log("Content deleted successfully")
//       if (onDelete) onDelete()
//     } catch (error) {
//       console.error("Error deleting content:", error)
//     }
//   }

//   function handleEditClick() {
//     setIsEditModalOpen(true)
//   }

//   function handleContentUpdate(updatedContent: Content) {
//     if (onUpdate) {
//       onUpdate(updatedContent)
//     }
//   }

//   return (
//     <>
//       <div className="bg-black rounded-lg border border-gray-800 shadow-md hover:shadow-lg transition-shadow flex flex-col h-auto overflow-hidden">
//         <div className="flex justify-between items-center p-4 border-b border-gray-800">
//           <div className="flex items-center">
//             <div className="pr-2">{iconMap[content.type]}</div>
//             <div className="font-medium text-sm text-white line-clamp-1">{content.title}</div>
//           </div>

//           <div className="flex items-center">
//             <button
//               onClick={handleEditClick}
//               className="p-1.5 mr-1 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
//               aria-label="Edit content"
//             >
//               <EditIcon />
//             </button>

//             <button
//               onClick={() => deleteContent(content._id)}
//               className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
//               aria-label="Delete content"
//             >
//               <DeleteIcon />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 min-h-0">
//           {content.type === "youtube" && (
//             <div className="aspect-video w-full">
//               <iframe
//                 className="w-full h-full"
//                 src={youtubeLink}
//                 title="YouTube video player"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 referrerPolicy="strict-origin-when-cross-origin"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           )}

//           {content.type === "instagram" && (
//             <div className="p-4 bg-black text-white">
//               <blockquote
//                 className="instagram-media"
//                 data-instgrm-captioned
//                 data-instgrm-permalink={instaLink}
//                 data-instgrm-version="14"
//               ></blockquote>
//               <div className="text-sm mt-2">
//                 <a href={content.link} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
//                   View on Instagram
//                 </a>
//               </div>
//             </div>
//           )}


//           {content.type === "twitter" && (
//             <div className="p-4 bg-black text-white">
//               <blockquote className="twitter-tweet bg-black">
//                 <a href={content.link.replace("x.com", "twitter.com")}></a>
//               </blockquote>
//               <div className="text-sm mt-2">
//                 <a href={content.link} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
//                   Open original tweet
//                 </a>
//               </div>
//             </div>
//           )}

//           {(content.type === "text" || content.type === "code") && (
//             <div className="p-4 bg-black text-white max-h-48 overflow-auto">
//               <pre className="whitespace-pre-wrap font-mono text-sm">{content.text}</pre>
//             </div>
//           )}

//           {(content.type === "randomLink") && (
//             <div className="p-4 bg-black text-white max-h-48 overflow-auto">
//               <pre className="whitespace-pre-wrap font-mono text-sm">
//               <a 
//                     href={content.link} 
//                     target="_blank" 
//                     rel="noopener noreferrer" 
//                     className="text-blue-400 hover:underline break-all text-sm"
//                   >
//                     {content.link}
//                   </a>
//                 </pre>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Edit Modal */}
//       <EditContentModal 
//         open={isEditModalOpen} 
//         onClose={() => setIsEditModalOpen(false)} 
//         content={content}
//         onUpdate={handleContentUpdate}
//       />
//     </>
//   )
// }





import { DeleteIcon } from "./icons/DeleteIcon"
import { YoutubeIcon } from "./icons/YoutubeIcon"
import { TwitterIcon } from "./icons/TwitterIcon"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import InstaIcon from "./icons/Instagram"
import type { ReactElement } from "react"
import { TextIcon } from "./icons/TextIcon"
import { LinkIcon } from "./icons/LinkIcon"
import CodeIcon from "./icons/CodeIcon"
import EditIcon from "./icons/EditIcon"
import { useState } from "react"
import { EditContentModal } from "./EditContentModal"

interface Content {
  _id: string
  link: string
  type:
  | "youtube"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "document"
  | "text"
  | "image"
  | "code"
  | "email"
  | "randomLink"
  title: string
  text?: string
  imageUrl?: string
  fileUrl?: string
}

const iconMap: Record<string, ReactElement> = {
  youtube: <YoutubeIcon />,
  twitter: <TwitterIcon />,
  instagram: <InstaIcon />,
  text: <TextIcon />,
  randomLink: <LinkIcon />,
  code: <CodeIcon />
}

interface CardProps {
  content: Content
  onDelete?: () => void
  onUpdate?: (updatedContent: Content) => void
}

export default function Card({ content, onDelete, onUpdate }: CardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  let youtubevidId = ""
  let instaLink = ""

  if (content.type === "instagram") {
    instaLink = content.link.split("?")[0] + "?utm_source=ig_embed&amp;utm_campaign=loading"
  }

  if (content.type === "youtube") {
    if (content.link.includes("?v=")) {
      youtubevidId = content.link.split("?v=")[1].split("&")[0]
    } else if (content.link.includes("youtu.be/")) {
      youtubevidId = content.link.split("youtu.be/")[1].split("?")[0]
    }
  }

  const youtubeLink = "https://www.youtube.com/embed/" + youtubevidId

  async function deleteContent(contentId: string) {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      if (onDelete) onDelete()
    } catch (error) {
      console.error("Error deleting content:", error)
    }
  }

  function handleEditClick() {
    setIsEditModalOpen(true)
  }

  function handleContentUpdate(updatedContent: Content) {
    if (onUpdate) {
      onUpdate(updatedContent)
    }
  }

  return (
    <>
      <div className="bg-black rounded-lg border border-gray-800 shadow-md hover:shadow-lg transition-shadow flex flex-col h-auto overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <div className="flex items-center">
            <div className="pr-2">{iconMap[content.type]}</div>
            <div className="font-medium text-sm text-white line-clamp-2">{content.title}</div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleEditClick}
              className="p-1.5 mr-1 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full transition-colors "
              aria-label="Edit content"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => deleteContent(content._id)}
              className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
              aria-label="Delete content"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>

        {/* ✅ Scrollable Content Area */}
        <div className="flex-1 min-h-0 max-h-96 overflow-hidden">
          <div className="h-full overflow-auto">
            {content.type === "youtube" && (
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={youtubeLink}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>

                <div className="text-sm mt-2 px-4">
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    View on Youtube
                  </a>
                </div>

              </div>
            )}

            {/* {content.type === "instagram" && (
              <div className="p-4 bg-black text-white">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={instaLink}
                  data-instgrm-version="14"
                ></blockquote>
                <div className="text-sm mt-2">
                  <a href={content.link} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                    View on Instagram
                  </a>
                </div>
              </div>
            )} */}


            {content.type === "instagram" && (
              <div className="p-0 bg-black text-white w-full overflow-hidden">
                <div className="w-full max-w-full">
                  <blockquote
                    className="instagram-media w-full m-0 p-0"
                    data-instgrm-permalink={instaLink}
                    data-instgrm-version="14"
                    style={{
                      width: '100%',
                      margin: 0,
                      padding: 0,
                      border: 'none',
                    }}
                  ></blockquote>
                </div>
                <div className="text-sm mt-2 px-4">
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    View on Instagram
                  </a>
                </div>
              </div>
            )}


            {content.type === "twitter" && (
              <div className="p-4 bg-black text-white">
                <blockquote className="twitter-tweet bg-black">
                  <a href={content.link.replace("x.com", "twitter.com")}></a>
                </blockquote>
                <div className="text-sm mt-2">
                  <a href={content.link} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                    Open original tweet
                  </a>
                </div>
              </div>
            )}

            {(content.type === "text" || content.type === "code") && (
              <div className="p-4 bg-black text-white">
                <pre className="whitespace-pre-wrap font-mono text-sm">{content.text}</pre>
              </div>
            )}

            {content.type === "randomLink" && (
              <div className="p-4 bg-black text-white">
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all text-sm"
                >
                  {content.link}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditContentModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        content={content}
        onUpdate={handleContentUpdate}
      />
    </>
  )
}
