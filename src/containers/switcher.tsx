import { styled } from '@styles/stitches.config'

interface SwitcherProps {
  limit?: number
}
interface SwitcherItemProps {
  threshold?: string
}

const Switcher_ = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
})

const SwitcherItem_ = styled('div', {
  flexGrow: '1',
  flexWrap: 'wrap',
  '& > *': {
    maxWidth: '100%',
  },
})

type SwitcherType = {
  Item: React.FC<SwitcherItemProps>
} & React.FC<SwitcherProps>

export const Switcher: SwitcherType = ({ children, limit = 5 }) => (
  <Switcher_
    css={{
      [`& > :nth-last-child(n + ${limit + 1}), & > :nth-last-child(n + ${
        limit + 1
      }) ~ *`]: {
        flexBasis: '100%',
      },
    }}>
    {children}
  </Switcher_>
)

Switcher.Item = ({ children, threshold }) => (
  <SwitcherItem_
    css={{
      flexBasis: `calc((${threshold || '30rem'} - 100%) * 999)`,
    }}>
    {children}
  </SwitcherItem_>
)
