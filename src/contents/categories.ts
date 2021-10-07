import { createCollection } from '@hooks/editor'

export const {
  getStaticList: getStaticCategories,
  getStaticSingle: getStaticCategory,
  useList: useCategories,
  useSingle: useCategory,
} = createCollection({
  name: 'categories',
  fields: [
    { name: 'title', label: 'Titulo', component: 'text' },
    { name: 'published', label: 'Publicado', component: 'toggle' },
    { name: 'body', label: 'Conteudo', component: 'markdown' },
  ],
})
