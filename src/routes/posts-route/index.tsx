import { Box } from '@containers/box'
import { PostProps } from '@contents/posts'

interface PostsRouteProps {
  posts: PostProps[]
}

export const PostsRoute: React.FC<PostsRouteProps> = ({
  children,
  posts,
  ...props
}) => {
  return <Box {...props}>{children}</Box>
}
