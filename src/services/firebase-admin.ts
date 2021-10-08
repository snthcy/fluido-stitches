import type { ServiceAccount } from 'firebase-admin'
import * as firebase from 'firebase-admin'

const config: TypedMap = JSON.parse(process.env.FIREBASE_KEY_ADMIN || '{}')

let faa: firebase.app.App

if (!firebase.apps || !firebase.apps.length) {
  faa = firebase.initializeApp({
    credential: firebase.credential.cert(config as ServiceAccount),
    databaseURL: `https://${config.project_id}.firebaseio.com`,
  })
} else {
  faa = firebase.app()
}

export const FirebaseAdminApp = faa
export const FirebaseAdminFirestore = firebase.firestore
