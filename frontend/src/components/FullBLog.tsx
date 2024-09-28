import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBLog = ({blog}:{blog:any}) => {
    return (
        <div>
            <Appbar/>
            <div className="flex justify-center">
                <div className="grid  grid-cols-12 px-10 w-full pt-12 max-w-screen-lg">
                    <div className="col-span-8 p-3">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Post on 2nd Feb 2021
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4 p-4">
                        <span className="text-slate-600 text-lg">
                            Author
                        </span>
                        <div className="flex justify-center">
                            <div className="flex flex-col justify-center pr-2">
                                <Avatar size='large' name={blog.author.name === null ? 'Anonymous' : blog.author.name}/>
                            </div>
                            <div>
                                <div className="text-xl font-bold flex flex-col justify-center">
                                    {blog.author.name === null ? 'Anonymous' : blog.author.name}
                                </div>
                                <div className="pt-2 text-slate-500 text-sm">
                                    Random catch phrase about the author to make them look cool
                                    and grab the attention of the reader
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}