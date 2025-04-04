
import { type ReactElement, useState } from "react"
import { TwitterIcon } from "./icons/TwitterIcon"
import { YoutubeIcon } from "./icons/YoutubeIcon"
import { DocumentIcon } from "./icons/DocumentIcon"
import { LinkIcon } from "./icons/LinkIcon"
import { TagIcon } from "./icons/TagIcon"
import { Button } from "../components/Button"
import { PlusIcon } from "../components/icons/PlusIcon"
import { ShareIcon } from "../components/icons/ShareIcon"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { CreateContentModel } from "./CreateContentModel"


interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("All")
  const [contentCreatePop, setContentCreatePop] = useState(false)

  const handleItemClick = (item: string) => {
    setActiveItem(item)
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  async function handleShareContent() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        {
          share: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )

      const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`
      window.navigator.clipboard.writeText(shareUrl)
      alert("Share URL copied to clipboard!")
    } catch (error) {
      console.error("Error sharing content:", error)
      alert("Failed to generate share link")
    }
  }

  return (
    <div className={`
      min-h-screen bg-black w-64 fixed top-0 left-0 flex flex-col shadow-xl z-30 transition-all duration-300
      border-r border-gray-800 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center pt-2 lg:hidden">
          <div className="text-2xl font-bold tracking-tight text-white">ONEBRAIN</div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-900"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="hidden lg:flex pt-2 text-2xl font-bold tracking-tight text-white">ONEBRAIN</div>

        <div className="pt-10 space-y-1.5 flex-grow">
          <SidebarElement logo={<TagIcon />} name="All" isActive={activeItem === "All"} onClick={() => handleItemClick("All")} />
          <SidebarElement logo={<TwitterIcon />} name="Tweets" isActive={activeItem === "Tweets"} onClick={() => handleItemClick("Tweets")} />
          <SidebarElement logo={<YoutubeIcon />} name="Videos" isActive={activeItem === "Videos"} onClick={() => handleItemClick("Videos")} />
          <SidebarElement logo={<DocumentIcon />} name="Docs" isActive={activeItem === "Docs"} onClick={() => handleItemClick("Docs")} />
          <SidebarElement logo={<LinkIcon />} name="Links" isActive={activeItem === "Links"} onClick={() => handleItemClick("Links")} />
        </div>

        <div className="p-4 flex flex-col gap-3 items-center">
          <Button onClick={() => setContentCreatePop(true)} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
          <Button onClick={handleShareContent} variant="secondary" text="Share" startIcon={<ShareIcon />} />
        </div>

        <div className="mt-auto pb-4">
          <div className="border-t border-gray-800 pt-4 mt-4">
            <button
              onClick={() => {
                localStorage.removeItem("token")
                window.location.href = "/signin"
              }}
              className="w-full py-2 text-center text-gray-300 rounded hover:bg-gray-900 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <CreateContentModel open={contentCreatePop} onClose={() => setContentCreatePop(false)} />
      </div>
    </div>
  )
}

function SidebarElement({ logo, name, isActive = false, onClick }: SidebarElementProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center py-3 px-4 rounded-md cursor-pointer transition-all
        ${isActive ? "bg-white text-black" : "hover:bg-gray-900 text-gray-400 hover:text-white"}
      `}
    >
      <div className="mr-3">{logo}</div>
      <div className="text-base font-medium">{name}</div>
    </div>
  )
}






