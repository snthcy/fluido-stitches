import { Box } from '@containers/box'
import { PostProps } from '@contents/posts'

interface PostsRouteProps {
  posts: PostProps[]
}

export const PostsRoute: React.FC<PostsRouteProps> = ({ posts }) => {
  return (
    <Box>
      {posts.map((p) => (
        <Box key={p.id}>
          <h2>{p.title || ''}</h2>
          <div dangerouslySetInnerHTML={{ __html: p.body }}></div>
        </Box>
      ))}
    </Box>
  )
}
