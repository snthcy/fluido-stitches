import { createCollection } from '@hooks/editor'

export interface PostProps {
  id: string
  title: string
  published: boolean
  body: string
}

export const { useList: usePosts, useSingle: usePost } =
  createCollection<PostProps>({
    name: 'posts',
    fields: [
      {
        component: 'text',
        name: 'title',
        label: 'Titulo',
        placeholder: 'Titulo da publicação',
        description: 'Serve para bla bla',
      },
      { component: 'richtext', name: 'body', label: 'Conteudo' },
      {
        component: 'toggle',
        name: 'published',
        label: 'Estado',
        toggleLabels: {
          true: 'Publicado',
          false: 'Rascunho',
        },
      },
    ],
  })
