
import { type ReactElement, useState } from "react";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { TagIcon } from "./icons/TagIcon";
import { Button } from "../components/Button";
import { PlusIcon } from "../components/icons/PlusIcon";
import { ShareIcon } from "../components/icons/ShareIcon";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { CreateContentModel } from "./CreateContentModel";
import { useActiveContent } from "../pages/contexts/activeContentContext";
import InstaIcon from "./icons/Instagram";
import { TextIcon } from "./icons/TextIcon";
import CodeIcon from "./icons/CodeIcon";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

enum contentType {
  All = "all",
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",
  Text = "text",
  Code = "code",
  RandomLink = "randomLink",
}

const iconMap: Record<string, ReactElement> = {
  all: <TagIcon />,
  youtube: <YoutubeIcon />,
  twitter: <TwitterIcon />,
  instagram: <InstaIcon />,
  text: <TextIcon />,
  randomLink: <LinkIcon />,
  code: <CodeIcon />
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { activeContent, setActiveContent } = useActiveContent();
  const [contentCreatePop, setContentCreatePop] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveContent(item);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  async function handleShareContent() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`;
      window.navigator.clipboard.writeText(shareUrl);
      alert("Share URL copied to clipboard!");
    } catch (error) {
      console.error("Error sharing content:", error);
      alert("Failed to generate share link");
    }
  };

  return (
    <div className={`
      h-screen w-64 fixed top-0 left-0 flex flex-col bg-black z-30 border-r border-gray-800
      transition-all duration-300 shadow-xl
      ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
    `}>
      {/* Logo */}
      <div className="flex items-center justify-center mt-4 mb-8">
      <div className="text-2xl font-bold tracking-tight text-white">ONEBRAIN</div>
      </div>
      {/* Menu */}
      <nav className="flex flex-col gap-1 px-2">
        {Object.entries(contentType).map(([key, value]) => (
          <SidebarElement
            key={key}
            logo={iconMap[value]}
            name={key}
            isActive={activeContent === key}
            onClick={() => handleItemClick(key)}
          />
        ))}
      </nav>
      {/* Bottom Section */}
      <div className="mt-3 px-2 gap-0.5  w-full flex flex-col items-center">
        <Button
          onClick={() => setContentCreatePop(true)}
          variant="primary"
          text="Add Content"
          startIcon={<PlusIcon />}
          className="w-full py-2 rounded-full font-bold text-lg mb-2"
        />
        <Button
          onClick={handleShareContent}
          variant="secondary"
          text="Share"
          startIcon={<ShareIcon />}
          className="w-full py-2 rounded-full font-bold text-lg mb-2"
        />
        <div className="w-full border-t border-gray-800 mt-2 pt-2">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/signin";
            }}
            className="w-full py-2 rounded-full bg-gray-900 cursor-pointer text-black font-bold text-lg hover:bg-gray-200 transition"
          >
            Sign Out
          </button>
        </div>
        <CreateContentModel open={contentCreatePop} onClose={() => setContentCreatePop(false)} />
      </div>
    </div>
  );
}

interface SidebarElementProps {
  logo: ReactElement;
  name: string;
  isActive?: boolean;
  onClick: () => void;
}

function SidebarElement({ logo, name, isActive = false, onClick }: SidebarElementProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-4 px-6 py-2 rounded-full cursor-pointer transition
        ${isActive ? "bg-gray-700 text-white" : "text-gray-200 hover:bg-gray-900"}
        text-lg
      `}
    >
      <span className="w-6 h-6">{logo}</span>
      <span>{name}</span>
    </div>
  );
}
