
async function Posts({ posts }: any) {



    return (
        <ul className="space-y-2">
            {posts.map((post : any, index : number) => (
                <li
                    key={index}
                    className="text-lg text-gray-700 cursor-pointer hover:text-gray-900"
                >
                    {post.title}
                    <img src={post.image} width="200" height="100" />
                </li>
            ))}
        </ul>
    )
}

export default Posts