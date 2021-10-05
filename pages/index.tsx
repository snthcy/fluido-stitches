import { Box } from '@containers/box'
import { Stack } from '@containers/stack'
import Head from 'next/head'
import { useThemeSelector } from 'src/hooks/use-theme-selector'

export default function Home() {
  const [currentTheme, themeSelector] = useThemeSelector('darkTheme')

  return (
    <>
      <Head>
        <title>Use Stitches with Next.js</title>
      </Head>
      <Stack
        onClick={() => {
          themeSelector(
            currentTheme === 'darkTheme' ? 'blueTheme' : 'darkTheme',
          )
        }}
        css={{
          background: '$gray400',
        }}>
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Stack key={i}>
              {Array(4)
                .fill(null)
                .map((_, j) => (
                  <Box
                    key={j}
                    css={{
                      bg: '$surface',
                      color: '$on-surface',
                      border: '1px solid',
                      borderColor: '$on-surface-divider',
                      padding: '$2',
                    }}>
                    {`item ${i + 1}.${j + 1}`}
                  </Box>
                ))}
            </Stack>
          ))}
      </Stack>
    </>
  )
}
