import { styled } from '@styles/stitches.config'

export const ButtonsGroup = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
})
export const Button = styled('button', {
  display: 'flex',
  appearance: 'none',
  background: 'white',
  color: 'black',
  padding: '.5rem',
  border: 'none',
  fontSize: '1.5rem',

  variants: {
    active: {
      true: {
        background: 'black',
        color: 'white',
      },
    },
  },
})
export const Input = styled('div', {})
