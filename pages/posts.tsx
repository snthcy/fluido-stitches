import { limit, orderBy, where } from '@firebase/firestore'
import { PostsRoute } from '@routes/posts-route'
import type { GetStaticProps } from 'next'
import { getStaticPosts, usePosts } from 'src/contents/posts'

export default function PostPage() {
  const posts = usePosts(
    where('published', '==', 'true'),
    limit(10),
    orderBy('createdAt', 'desc'),
  )

  return <PostsRoute posts={posts} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getStaticPosts((col) =>
    col.where('published', '==', 'true').limit(10).orderBy('createdAt', 'desc'),
  )

  return {
    props: {
      ...posts,
    },
  }
}
