import { usePosts } from '@contents/posts'
import { PostsRoute } from '@routes/posts-route'
import { getStaticContents } from '@services/contents'
import { GetStaticProps } from 'next'

export default function PostPage() {
  const posts = usePosts()

  return <PostsRoute posts={posts} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getStaticContents('posts', (col) => col.limit(10))

  return {
    props: {
      ...posts,
    },
  }
}
