declare module NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_FIREBASE_KEY_CLIENT: string
    readonly FIREBASE_KEY_ADMIN: string
    readonly [key: string]: string
  }
}
