import { useParams } from "react-router-dom";
import { useBLog } from "../hooks";
import { FullBLog } from "../components/FullBLog";

// perfect use of atom family or selector family
const Blog = () => {
  const {id} = useParams();
  const {loading,blog} = useBLog({id:id||""});
  
  if(loading){
    return <div>
        Loading...
      </div>
  }
  return (
    <div>
      <FullBLog blog={blog}/>
    </div>
  )
}

export default Blog