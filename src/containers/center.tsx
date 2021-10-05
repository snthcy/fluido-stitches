import type { ScaleValue } from '@stitches/react'
import { styled, theme } from '@styles/stitches.config'
import { parseValues } from '@styles/parsers'

export const Center = styled('div', {
  boxSizing: 'content-box',
  marginX: 'auto',
  maxWidth: 'var(--measure)',

  utils: {
    space: (value: ScaleValue<'space'>) => ({
      '& > * + *': {
        marginTop: value,
      },
    }),
  },

  variants: {
    space: parseValues(theme.space, 'marginTop'),
  },
})
