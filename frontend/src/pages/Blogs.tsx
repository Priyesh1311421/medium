import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";


const Blogs = () => {
  const {blogs,loading} = useBlogs();
  if(loading){
    return <div>
        <Appbar/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
      </div>
  }
  return (
    <div>
      <Appbar/>
      <div className="flex justify-center">
        <div >
          {blogs.map((blog:any)=>
            <BlogCard 
                id={blog.id}
                authorName={blog.author.name === null ? 'Anonymous' : blog.author.name}  
                title={blog.title}
                content={blog.content}
                publishedDate="2021-01-01"
            />
          ).reverse()}
        </div>
      </div>
    </div>
  )
}

export default Blogs