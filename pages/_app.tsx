import { EditorProvider } from '@hooks/editor'
import { FirebaseProvider } from '@hooks/firebase'
import { PageProvider } from '@hooks/page'
import { globalStyles } from '@styles/global'
import type { AppProps } from 'next/app'

globalStyles()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageProvider page={pageProps}>
      <FirebaseProvider>
        <EditorProvider>
          <Component />
        </EditorProvider>
      </FirebaseProvider>
    </PageProvider>
  )
}

export default MyApp
