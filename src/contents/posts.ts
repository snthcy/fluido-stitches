import { createCollection } from '@hooks/editor'

export interface PostProps {
  id: string
  title: string
  published: boolean
  body: string
}

export const {
  getStaticList: getStaticPosts,
  getStaticSingle: getStaticPost,
  useList: usePosts,
  useSingle: usePost,
} = createCollection<PostProps>({
  name: 'posts',
  fields: [
    {
      component: 'text',
      name: 'title',
      label: 'Titulo',
      placeholder: 'Titulo da publicação',
      description: 'Serve para bla bla',
    },
    {
      component: 'toggle',
      name: 'published',
      toggleLabels: {
        true: 'Publicado',
        false: 'Rascunho',
      },
    },
    { component: 'markdown', name: 'body', label: 'Conteudo' },
  ],
})
