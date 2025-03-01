import { ShareIcon } from './icons/ShareIcon';
import { DeleteIcon } from './icons/DeleteIcon';


interface CardProps{
    link:string,
    type:"youtube" | "twitter",
    title:string
}


export default function Card({link,type,title}:CardProps) {

        let youtubevidId 
        if(type == "youtube"){
            youtubevidId = link.split("?v=")[1]
        }
        const youtubeLink = "http://www.youtube.com/embed/" + youtubevidId

    return (
        <div className="bg-white p-4 max-w-72 rounded-md border shadow-md border-gray-200 min-h-48">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className='pr-2'>
                        <ShareIcon />
                    </div>


                    <div>
                        {title}
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='pr-3'>
                        <ShareIcon />
                    </div>
                    <div>
                        <DeleteIcon />
                    </div>
                </div>
            </div>

            <div className='pt-4'>
                {type == "youtube" && <iframe className='w-full rounded' width="560" height="315" src={youtubeLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }
                
               
                {/** //"https://www.youtube.com/embed/p0WRHxYQxHM?si=hzzk7vlda5yL76G4"
                //https://www.youtube.com/watch?v=Ym4ti89tItw
                // 
                src="https://www.youtube.com/embed/Ym4ti89tItw?si=7qA-74Fdm0GUrk3f" 
                  */}
                
              

                {type == "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com","twitter.com")}></a>
                </blockquote>}
            </div>

                 
            


        </div>
    )
}


