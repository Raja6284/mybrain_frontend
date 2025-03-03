import { ShareIcon } from './icons/ShareIcon';
import { DeleteIcon } from './icons/DeleteIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
//import { useContent } from '../pages/hooks/useContent';

// interface CardProps {
//     link: string,
//     type: "youtube" | "twitter",
//     title: string,
//     contentId?:string
// }


// export default function Card({ link, type, title, contentId}: CardProps) {

export default function Card({ content}: any) {

    // const { contents, refresh } = useContent()
    console.log(content)

    let youtubevidId
    if (content.type == "youtube") {
        youtubevidId = content.link.split("?v=")[1]
    }
    const youtubeLink = "http://www.youtube.com/embed/" + youtubevidId

    async function deleteContent(contentId:any) {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                data: { contentId },  
                headers: {
                    "Authorization": localStorage.getItem("token"),
                },
            });
            console.log("Content deleted successfully");
        } catch (error) {
            console.error("Error deleting content:", error);
        }
    }


    return (
        <div className="bg-white p-4 max-w-72 rounded-md border shadow-md border-gray-200 min-h-48">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className='pr-2'>
                        {content.type == "youtube" ? <YoutubeIcon /> : <TwitterIcon />}
                    </div>


                    <div>
                        {content.title}
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='pr-3'>
                        <ShareIcon />
                    </div>

                    <div onClick={() => deleteContent(content._id)} className="cursor-pointer">
                        <DeleteIcon />
                    </div>

                </div>
            </div>

            <div className='pt-4'>
                {content.type == "youtube" && <iframe className='w-full rounded' width="560" height="315" src={youtubeLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }

                {content.type == "twitter" && <blockquote className="twitter-tweet">
                    <a href={content.link.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div>

        </div>
    )
}


