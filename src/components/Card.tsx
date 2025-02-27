import { ShareIcon } from './icons/ShareIcon';

export default function Card() {
    return (
        <div className="bg-white p-4 max-w-72 rounded-md border shadow-md border-gray-200 ">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className='pr-2'>
                        <ShareIcon />
                    </div>


                    <div>
                        Project Ideas
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='pr-2'>
                        <ShareIcon />
                    </div>
                    <div>
                        <ShareIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}