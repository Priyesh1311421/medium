import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({ authorName, title, content, publishedDate,id }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b-2 p-4 border-slate-200 pb-4">
                <div className="flex">
                    <div className="flex justify-center flex-col">
                        <Avatar size ="small" name={authorName}/>
                    </div> 
                    <span className="flex justify-center flex-col font-extralight px-2 text-sm">
                        <div>
                            {authorName} 
                        </div>
                    </span> 
                    <span className="text-slate-500">
                        &middot;
                    </span>
                    <span className="flex justify-center flex-col font-thin pl-2 text-slate-500 text-sm">
                        <div>
                            {publishedDate}
                        </div>
                    </span>
                </div>
                <div className="text-xl font-semibold">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 100)}...
                </div>
                <div className="text-slate-500 font-thin">
                    {`${Math.ceil(content.length / 300)} mins read`}
                </div>
            </div>
        </Link>
    )
}

export function Avatar({name,size}:{name:string,size?:"small"|"large"}){ 
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden ${size === 'small'?"w-6 h-6":"w-10 h-10"} bg-gray-100 rounded-full `}>
            <span className={`font-medium ${size === 'small'?"text-xs":"text-md"} text-gray-600 `}>
                {name[0]}
            </span>
        </div>
    )
}