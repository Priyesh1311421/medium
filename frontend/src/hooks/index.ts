import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[])

    return {blogs,loading}
}

export const useBLog = ({id}:{id:string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setBlog(response.data.blog);
            setLoading(false);
        });
    },[id]);

    return {blog,loading}
}