import { createContext, useContext } from 'react'

const PageContext = createContext<any>({})

export const usePage = () => useContext(PageContext)

export const PageProvider: React.FC<{ page?: any }> = ({ children, page }) => {
  return <PageContext.Provider value={page}>{children}</PageContext.Provider>
}
