import type { CSS } from '@stitches/react'
import { styled } from '@styles/stitches.config'
import { FC } from 'react'

const Heading_ = styled('h2', {})

interface HeadingProps {
  css?: CSS
  slug?: string
}

export const Heading: FC<HeadingProps> = ({ children, slug, ...props }) => {
  return (
    <Heading_ {...props}>
      {slug ? (
        <a id={slug} href={`#${slug}`}>
          {children}
        </a>
      ) : (
        children
      )}
    </Heading_>
  )
}
