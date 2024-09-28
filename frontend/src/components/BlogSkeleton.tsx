export const BlogSkeleton = () => {
    return(
        <div className="flex justify-center px-8">
            <div className=" max-w-screen-md w-full animate-pulse my-5 border-b-2 ">
                <div className="flex">
                    <div className="h-4 bg-gray-200 rounded-full  w-4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-full  w-20 ml-2 mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full  w-20 ml-2 mb-2.5"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full  mb-2.5 pt-2"></div>
                <div className="h-3 bg-gray-200 rounded-full  max-w-xl mb-2.5"></div>
                <div className="h-3 bg-gray-200 rounded-full  max-w-24 mb-4"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}