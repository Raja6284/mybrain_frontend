

import { ReactElement, useState } from "react"
import { TwitterIcon } from "./icons/TwitterIcon"
import { YoutubeIcon } from "./icons/YoutubeIcon"
import { DocumentIcon } from "./icons/DocumentIcon"
import { LinkIcon } from "./icons/LinkIcon"
import { TagIcon } from "./icons/TagIcon"

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [activeItem, setActiveItem] = useState("All")

    // Close sidebar after item selection on mobile
    const handleItemClick = (item: string) => {
        setActiveItem(item);
        if (window.innerWidth < 1024) {
            onClose();
        }
    };

    return (
        <div className={`
            min-h-screen bg-amber-50 w-64 fixed top-0 left-0 flex flex-col shadow-md z-30 transition-all duration-300
            lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="p-3 flex flex-col h-full">
                {/* Close button for mobile */}
                <div className="flex justify-between items-center pt-4 lg:hidden">
                    <div className="text-2xl font-bold">MY BRAIN</div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-700 hover:text-gray-900"
                        aria-label="Close sidebar"
                    >
                        ✕
                    </button>
                </div>
                
                {/* Desktop title */}
                <div className="hidden lg:flex pt-4 text-2xl font-bold justify-center">
                    MY BRAIN
                </div>

                <div className="pt-6 pl-2 space-y-1 flex-grow">
                    <SidebarElement 
                        logo={<TagIcon />} 
                        name="All" 
                        isActive={activeItem === "All"}
                        onClick={() => handleItemClick("All")}
                    />
                    <SidebarElement 
                        logo={<TwitterIcon />} 
                        name="Tweets" 
                        isActive={activeItem === "Tweets"}
                        onClick={() => handleItemClick("Tweets")}
                    />
                    <SidebarElement 
                        logo={<YoutubeIcon />} 
                        name="Videos" 
                        isActive={activeItem === "Videos"}
                        onClick={() => handleItemClick("Videos")}
                    />
                    <SidebarElement 
                        logo={<DocumentIcon />} 
                        name="Docs" 
                        isActive={activeItem === "Docs"}
                        onClick={() => handleItemClick("Docs")}
                    />
                    <SidebarElement 
                        logo={<LinkIcon />} 
                        name="Links" 
                        isActive={activeItem === "Links"}
                        onClick={() => handleItemClick("Links")}
                    />
                </div>

                <div className="mt-auto pb-4">
                    <div className="border-t border-amber-200 pt-4 mt-4">
                        <button 
                            onClick={() => {
                                localStorage.removeItem("token")
                                window.location.href = "/signin"
                            }}
                            className="w-full py-2 text-center text-red-500 rounded hover:bg-amber-100 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface SidebarElementProps {
    logo: ReactElement;
    name: string;
    isActive?: boolean;
    onClick?: () => void;
}

function SidebarElement({ logo, name, isActive = false, onClick }: SidebarElementProps) {
    return (
        <div 
            onClick={onClick}
            className={`
                flex items-center py-2 px-3 rounded-md cursor-pointer transition-all
                ${isActive 
                    ? 'bg-amber-200 text-amber-900' 
                    : 'hover:bg-amber-100 text-amber-800'}
            `}
        >
            <div className="mr-3">
                {logo}
            </div>
            <div className="text-base">
                {name}
            </div>
        </div>
    )
}






