import { RichTextPlugin } from '@tools/editor/plugins'
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  setDoc,
  DocumentReference,
  Firestore,
  updateDoc,
} from 'firebase/firestore'
import { useMemo } from 'react'
import {
  ActionButton,
  TinaCMS,
  TinaProvider,
  useForm,
  usePlugin,
} from 'tinacms'
import { v4 as uuidV4 } from 'uuid'
import { useFirebaseFirestore } from './firebase'
import { usePage } from './page'

export const EditorProvider: React.FC = ({ children }) => {
  const cms = useMemo(() => {
    const cms = new TinaCMS({
      enabled: true,
      sidebar: true,
      toolbar: false,
      plugins: [RichTextPlugin],
    })

    return cms
  }, [])

  return (
    <TinaProvider cms={cms} position='displace'>
      {children}
    </TinaProvider>
  )
}

function useTinaSingleForm<E extends TypedMap = any>(
  doc: DocumentReference<E>,
  initial: E,
  config: CollectionConfig,
) {
  return useForm<E>({
    id: doc.id,
    initialValues: initial,
    label: config.label || config.name,
    fields: config.fields,
    onSubmit(value) {
      updateDoc(doc, value)
    },
    actions: [
      () => {
        return (
          <ActionButton
            onClick={() => {
              deleteDoc(doc)
                .then((a) => console.debug(a))
                .catch((e) => console.error(e))
            }}>
            Excluir
          </ActionButton>
        )
      },
      ({ form }) => {
        return (
          <ActionButton
            onClick={() => {
              form.finalForm.reset()
            }}>
            Reiniciar
          </ActionButton>
        )
      },
    ],
  })
}

function useTinaListForm<E extends TypedMap = any>(
  db: Firestore,
  initial: E[],
  config: CollectionConfig,
) {
  return useForm<E>({
    id: config.name + '-form',
    initialValues: initial,
    label: config.label || config.name,
    fields: [
      {
        component: 'group-list',
        name: config.label || config.name,
        label: config.label || config.name,
        fields: config.fields,
        itemProps: (el: E) => {
          return { key: el.slug || el.id }
        },
        defaultItem: () => ({
          id: uuidV4(),
        }),
      },
    ] as CollectionField[],
    onSubmit(value) {
      const lists = value[config.name] as E[]
      lists.forEach((item) => {
        const d = doc(db, `${config.name}/${item.id}`)
        setDoc(d, item, { merge: true })
      })
    },
    buttons: {
      save: 'Salvar',
      reset: 'Reiniciar',
    },
    actions: [],
  })
}

export function createCollection<E extends TypedMap = any>(
  config: CollectionConfig,
) {
  const contentName = config.name

  return {
    useSingle(slug: string) {
      const db = useFirebaseFirestore()
      const page = usePage()
      const initial = page[`${contentName}-${slug}`] as any
      const [data, form] = useTinaSingleForm<E>(
        doc(db, `${contentName}/${slug}`) as DocumentReference<E>,
        initial,
        config,
      )
      usePlugin(form)

      return data
    },
    useList() {
      const db = useFirebaseFirestore()
      const page = usePage()
      const initial = (page[contentName + 'List'] || []) as E[]
      const [data, form] = useTinaListForm<E>(db, initial, config)
      usePlugin(form)

      return data[contentName] || []
    },
  }
}
