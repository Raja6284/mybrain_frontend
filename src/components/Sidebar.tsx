import { ReactElement } from "react"
import { TwitterIcon } from "./icons/TwitterIcon"
import { YoutubeIcon } from "./icons/YoutubeIcon"
import { DocumentIcon } from "./icons/DocumentIcon"
import { LinkIcon } from "./icons/LinkIcon"
import { TagIcon } from "./icons/TagIcon"

export function Sidebar() {

    return (
        <div className="min-h-screen bg-amber-50 w-48  fixed top-0 left-0 flex flex-col">


            <div className="p-3">
                <div className="pt-4 text-3xl font-bold flex justify-center">
                    MY BRAIN
                </div>

                <div className="pt-5 pl-5 gap-1.5 ">
                    <SidebarElement logo={<TwitterIcon />} name="Tweets" />
                    <SidebarElement logo={<YoutubeIcon />} name="Videos" />
                    <SidebarElement logo={<DocumentIcon />} name="Docs" />
                    <SidebarElement logo={<LinkIcon />} name="Links" />
                    <SidebarElement logo={<TagIcon />} name="Tags" />
                </div>
            </div>
        </div>
    )
}

interface sidebarProps {
    logo: ReactElement,
    name: string
}

function SidebarElement({ logo, name }: sidebarProps) {

    return (
        <div className="flex items-center text-xl mt-3 cursor-pointer hover:bg-amber-100 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <div className="pr-3">
                {logo}
            </div>

            <div>
                {name}
            </div>
        </div>

    )
}