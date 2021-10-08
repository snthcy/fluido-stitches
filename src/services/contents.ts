import { FirebaseAdminFirestore } from '@services/firebase-admin'
import firebaseAdmin from 'firebase-admin'

export async function getStaticContent<E extends TypedMap = any>(
  contentName: string,
  slug: string,
): Promise<NextStaticResult<string, E>> {
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
}

export async function getStaticContents<E extends TypedMap = any>(
  contentName: string,
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
}
