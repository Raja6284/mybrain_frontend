


"use client"

import { ShareIcon } from "./icons/ShareIcon"
import { DeleteIcon } from "./icons/DeleteIcon"
import { YoutubeIcon } from "./icons/YoutubeIcon"
import { TwitterIcon } from "./icons/TwitterIcon"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import InstaIcon from "./icons/Instagram"
import type { ReactElement } from "react"
import { TextIcon } from "./icons/TextIcon"

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
  youtube: <YoutubeIcon/>,
  twitter: <TwitterIcon/>,
  instagram: <InstaIcon/>,
  text: <TextIcon/>,
}

interface CardProps {
  content: Content
  onDelete?: () => void
}

export default function Card({ content, onDelete }: CardProps) {
  let youtubevidId = ""
  let instaLink = ""

  if (content.type === "instagram") {
    instaLink = content.link.split("?")[0] + "?utm_source=ig_embed&amp;utm_campaign=loading"
  }

  if (content.type === "youtube") {
    // Handle different YouTube URL formats
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
      console.log("Content deleted successfully")
      if (onDelete) onDelete()
    } catch (error) {
      console.error("Error deleting content:", error)
    }
  }

  async function shareContent() {
    try {
      const shareText = `Check out this ${content.type === "youtube" ? "video" : "tweet"}: ${content.link}`
      await navigator.clipboard.writeText(shareText)
      alert("Content link copied to clipboard!")
    } catch (error) {
      console.error("Error sharing content:", error)
    }
  }

  return (
    <div className="bg-black rounded-lg border border-gray-800 shadow-md hover:shadow-lg transition-shadow flex flex-col h-auto overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="pr-2">{iconMap[content.type]}</div>
          <div className="font-medium text-sm text-white line-clamp-1">{content.title}</div>
        </div>

        <div className="flex items-center">
          <button
            onClick={shareContent}
            className="p-1.5 mr-1 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Share content"
          >
            <ShareIcon />
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

      <div className="flex-1 min-h-0">
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
          </div>
        )}

        {content.type === "instagram" && (
          <div className="p-4 bg-black text-white">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={instaLink}
              data-instgrm-version="14"
            ></blockquote>
            <div className="text-sm mt-2">
              <a href={content.link} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
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
          <div className="p-4 bg-black text-white max-h-48 overflow-auto">
            <pre className="whitespace-pre-wrap font-mono text-sm">{content.text}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

