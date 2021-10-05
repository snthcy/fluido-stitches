import { styled } from '@styles/stitches.config'

interface SidebarProps {
  preventStretch?: boolean
}

const Sidebar_ = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  variants: {
    preventStretch: {
      true: {
        alignItems: 'flex-start',
      },
    },
  },
})

const Aside_ = styled('div', {
  flexGrow: '1',
})

const Content_ = styled('div', {
  flexBasis: '0',
  flexGrow: '9999',
})

type SidebarType = {
  Aside: React.FC<{ sideWidth?: string }>
  Content: React.FC<{ contentMin?: string }>
} & React.FC<SidebarProps>

export const Sidebar: SidebarType = ({ children }) => (
  <Sidebar_>{children}</Sidebar_>
)

Sidebar.Aside = ({ children, sideWidth }) => (
  <Aside_ css={{ flexBasis: sideWidth || '20rem' }}>{children}</Aside_>
)
Sidebar.Content = ({ children, contentMin }) => (
  <Content_
    css={{
      minWidth: `min(${contentMin || '50%'}, 100%)`,
    }}>
    {children}
  </Content_>
)
