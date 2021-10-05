import type { ScaleValue, PropertyValue } from '@stitches/react'
import { styled, theme } from '@styles/stitches.config'
import { parseValues } from '@styles/parsers'

export const Cluster = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',

  variants: {
    space: parseValues(theme.space, 'gap'),
    justify: {
      start: {
        justify: 'flex-start',
      },
      end: {
        justify: 'flex-end',
      },
      center: {
        justify: 'center',
      },
      around: {
        justify: 'space-around',
      },
      between: {
        justify: 'space-between',
      },
      evenly: {
        justify: 'space-evenly',
      },
    },
    items: {
      start: {
        items: 'flex-start',
      },
      end: {
        items: 'flex-end',
      },
      center: {
        items: 'center',
      },
      stretch: {
        items: 'stretch',
      },
      baseline: {
        items: 'baseline',
      },
    },
  },
  defaultVariants: {
    space: '2',
    items: 'center',
    justify: 'start',
  },
})
