

import { ShareIcon } from './icons/ShareIcon';
import { DeleteIcon } from './icons/DeleteIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import InstaIcon from './icons/Instagram';
import { ReactElement } from 'react';

interface Content {
    _id: string;
    link: string;
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
    | "randomLink";
    title: string;
    text?: string;
    imageUrl?: string;
    fileUrl?: string;
}


const iconMap: Record<string, ReactElement> = {
    "youtube": <YoutubeIcon />,
    "twitter": <TwitterIcon />,
    "instagram": <InstaIcon />
}



interface CardProps {
    content: Content;
    onDelete?: () => void;
}

export default function Card({ content, onDelete }: CardProps) {

    let youtubevidId = '';
    let instaLink = '';

    if (content.type === "instagram") {
        instaLink = content.link.split("?")[0] + "?utm_source=ig_embed&amp;utm_campaign=loading"
       
    }

    if (content.type === "youtube") {
        // Handle different YouTube URL formats
        if (content.link.includes("?v=")) {
            youtubevidId = content.link.split("?v=")[1].split("&")[0];
        } else if (content.link.includes("youtu.be/")) {
            youtubevidId = content.link.split("youtu.be/")[1].split("?")[0];
        }
    }

    const youtubeLink = "https://www.youtube.com/embed/" + youtubevidId;


    async function deleteContent(contentId: string) {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                data: { contentId },
                headers: {
                    "Authorization": localStorage.getItem("token"),
                },
            });
            console.log("Content deleted successfully");
            if (onDelete) onDelete();
        } catch (error) {
            console.error("Error deleting content:", error);
        }
    }

    async function shareContent() {
        try {
            const shareText = `Check out this ${content.type === 'youtube' ? 'video' : 'tweet'}: ${content.link}`;
            await navigator.clipboard.writeText(shareText);
            alert("Content link copied to clipboard!");
        } catch (error) {
            console.error("Error sharing content:", error);
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg border shadow-md border-gray-200 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                    <div className="pr-2 text-gray-600">
                        {iconMap[content.type]}
                    </div>
                    <div className="font-medium text-sm sm:text-base line-clamp-2">
                        {content.title}
                    </div>
                </div>

                <div className="flex items-center">
                    <button
                        onClick={shareContent}
                        className="p-1 mr-2 text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Share content"
                    >
                        <ShareIcon />
                    </button>

                    <button
                        onClick={() => deleteContent(content._id)}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                        aria-label="Delete content"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>

            <div className="grow">

                {content.type === "youtube" && (
                    <div className="relative pt-[56.25%] w-full overflow-hidden rounded-md">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={youtubeLink}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                {content.type === "instagram" && (
                    <div className="relative  w-full overflow-hidden rounded-md">
                        <blockquote
                            className="instagram-media"
                            data-instgrm-captioned
                            data-instgrm-permalink={instaLink}
                            data-instgrm-version="14">
                        </blockquote>


                        {/* <blockquote
                            className="instagram-media"
                            data-instgrm-captioned
                            data-instgrm-permalink={instaLink}
                            data-instgrm-version="14"
                            style={{
                                background: "#FFF",
                                border: 0,
                                borderRadius: "3px",
                                boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                                margin: "1px",
                                maxWidth: "540px",
                                minWidth: "326px",
                                padding: 0,
                                width: "calc(100% - 2px)",
                            }}
                        >
                            <div style={{ padding: "16px" }}>
                                <a
                                    href={instaLink}
                                    style={{
                                        background: "#FFFFFF",
                                        lineHeight: 0,
                                        padding: 0,
                                        textAlign: "center",
                                        textDecoration: "none",
                                        width: "100%",
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <div
                                            style={{
                                                backgroundColor: "#F4F4F4",
                                                borderRadius: "50%",
                                                height: "40px",
                                                width: "40px",
                                                marginRight: "14px",
                                            }}
                                        ></div>
                                        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                                            <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", height: "14px", marginBottom: "6px", width: "100px" }}></div>
                                            <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", height: "14px", width: "60px" }}></div>
                                        </div>
                                    </div>
                                    <div style={{ padding: "19% 0" }}></div>
                                    <div style={{ display: "block", height: "50px", margin: "0 auto 12px", width: "50px" }}>
                                        <svg width="50px" height="50px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                                            <g fill="black">
                                                <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852..." />
                                            </g>
                                        </svg>
                                    </div>
                                    <div style={{ paddingTop: "8px", color: "#3897f0", fontFamily: "Arial, sans-serif", fontSize: "14px", fontWeight: "550", lineHeight: "18px" }}>
                                        View this post on Instagram
                                    </div>
                                </a>
                            </div>
                        </blockquote> */}
                    </div>
                )}

                {content.type === "twitter" && (
                    <div className="twitter-embed overflow-hidden rounded-md">
                        <blockquote className="twitter-tweet">
                            <a href={content.link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                        {/* Twitter preview placeholder */}
                        <div className="bg-gray-100 p-4 rounded text-sm text-gray-600 mt-2">
                            Twitter preview will load when shared
                            <a
                                href={content.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-2 text-blue-500 hover:underline"
                            >
                                Open original tweet
                            </a>
                        </div>
                    </div>
                )}

                {(content.type === "text" || content.type === "code") &&
                    <div className="relative  text-black w-full overflow-hidden rounded-md">
                        {content.text}
                    </div>

                }



            </div>
        </div>
    );
}