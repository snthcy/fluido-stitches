import { styled } from '@styles/stitches.config'
import { FC } from 'react'

interface SwitcherProps {
  limit?: number
  threshold?: string
}

const Switcher_ = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  '& > *': {
    flexGrow: 1,
  },
  '& > * > *': {
    maxWidth: '100%',
  },
})

export const Switcher: FC<SwitcherProps> = ({
  children,
  limit = 4,
  threshold,
}) => (
  <Switcher_
    css={{
      [`& > :nth-last-child(n + ${limit + 1}),
        & > :nth-last-child(n + ${limit + 1}) ~ *`]: {
        flexBasis: '100%',
      },
      '& > *': {
        flexBasis: `calc((${threshold || '30rem'} - 100%) * 999)`,
      },
    }}>
    {children}
  </Switcher_>
)
