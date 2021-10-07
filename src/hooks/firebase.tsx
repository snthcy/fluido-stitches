import firebaseConfig from '@config/firebase-client.json'
import { getFirestore } from '@firebase/firestore'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { createContext, useContext, useMemo } from 'react'

const FirebaseContext = createContext<FirebaseApp | null>(null)

export const useFirebaseApp = () => useContext(FirebaseContext)

export const useFirebaseFirestore = () => {
  const app = useFirebaseApp()
  return getFirestore(app)
}

export const FirebaseProvider: React.FC = ({ children }) => {
  const client = useMemo(() => initializeApp(firebaseConfig), [])

  return (
    <FirebaseContext.Provider value={client}>
      {children}
    </FirebaseContext.Provider>
  )
}
