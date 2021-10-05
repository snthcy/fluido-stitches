import { styled, theme } from '@styles/stitches.config'
import { parseValues, negativate } from '@styles/parsers'

export const Stack = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',

  '& > *': {
    marginTop: 0,
    marginBottom: 0,
  },

  variants: {
    space: {
      ...parseValues(theme.space, 'space'),
      ...negativate(parseValues(theme.space, 'space')),
    },
  },
  defaultVariants: {
    space: '2',
  },
})
