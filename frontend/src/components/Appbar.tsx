import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    const token = localStorage.getItem('token');
    return (
        <div className=" border-b
        flex justify-between px-10 py-2
        ">
            <Link to={'/blogs'} className="font-semibold flex justify-center flex-col"> 
                Medium  
            </Link>
            <div>
                {token ?<Link to={'/publish'}>
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-3xl mr-4 text-sm px-2 py-1.5 me-2 ">New</button>
                </Link>:<Link to={'/signin'}>
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-3xl mr-4 text-sm px-2 py-1.5 me-2 ">Login</button>
                </Link>}
                <Avatar size ='large' name="User"/>
            </div>
        
        </div>
    )
}   