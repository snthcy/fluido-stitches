import { FirebaseAdminFirestore } from '@services/firebase-admin'
import { useFirestoreCollection } from '@vulppi/react-use-firebase'
import firebaseAdmin from 'firebase-admin'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query as fQuery,
  DocumentReference,
  Firestore,
  QueryConstraint,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { useMemo } from 'react'
import {
  ActionButton,
  TinaCMS,
  TinaProvider,
  useForm,
  usePlugins,
} from 'tinacms'
import { useFirebaseFirestore } from './firebase'
import { usePage } from './page'

export const EditorProvider: React.FC = ({ children }) => {
  const cms = useMemo(() => new TinaCMS(), [])

  return (
    <TinaProvider cms={cms} position='displace'>
      {children}
    </TinaProvider>
  )
}

export function createCollection<E extends TypedMap = any>(
  config: CollectionConfig,
) {
  const contentName = config.name

  const usePluginLoader = (db: Firestore) => {
    return usePlugins({
      __type: 'content-button',
      name: config.name,
      fields: config.fields,
      async onSubmit(values) {
        if (db) {
          const col = collection(db, config.name)
          addDoc(col, values)
        }
      },
    } as any)
  }

  const useTinaForm = (doc: DocumentReference<E>, initial: E) => {
    return useForm<E>({
      id: doc.id,
      initialValues: initial,
      label: config.label || config.name,
      fields: config.fields,
      onSubmit() {},
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

  return {
    useSingle(slug: string) {
      const db = useFirebaseFirestore()
      usePluginLoader(db)
      const page = usePage()
      const initial = page[`${contentName}-${slug}`] as any

      return useTinaForm(
        doc(db, `${contentName}/${slug}`) as DocumentReference<E>,
        initial,
      )
    },
    useList(...query: QueryConstraint[]): E[] {
      const db = useFirebaseFirestore()
      const page = usePage()
      const initial = page[contentName + 'List'] as E[]
      const { data } = useFirestoreCollection<E>(db, contentName, {
        fallback: initial,
        filter: (col) => fQuery(col, ...query),
        parser: (snap) =>
          snap.docs.map<E>((doc: QueryDocumentSnapshot<E>) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          }),
      })

      return (data as E[]) || initial
    },
    async getStaticSingle(slug: string): Promise<NextStaticResult<string, E>> {
      const doc = FirebaseAdminFirestore().doc(
        `${contentName}/${slug}`,
      ) as firebaseAdmin.firestore.DocumentReference<E>
      const docData = await doc.get()
      return {
        [`${contentName}-${slug}`]: {
          id: docData.id,
          ...(docData.data() || {}),
        },
      }
    },
    async getStaticList(
      query: (
        query: firebaseAdmin.firestore.CollectionReference<E>,
      ) => firebaseAdmin.firestore.Query<E>,
    ): Promise<NextStaticResult<string, E>> {
      const col = FirebaseAdminFirestore().collection(
        contentName,
      ) as firebaseAdmin.firestore.CollectionReference<E>
      const q = query(col)
      const snap = await q.get()

      return {
        [contentName + 'List']: snap.docs.map<E>((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }),
      }
    },
  }
}
