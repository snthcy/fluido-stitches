import * as themes from '@styles/themes'
import { useLayoutEffect, useState } from 'react'

type ThemeKeys = keyof typeof themes

type UseThemeSelector = (
  initial?: ThemeKeys,
) => [ThemeKeys | null, React.Dispatch<React.SetStateAction<ThemeKeys>>]

const ssrUseEffect = process.browser ? useLayoutEffect : () => {}

export const useThemeSelector: UseThemeSelector = (initial) => {
  const [theme, setTheme] = useState<ThemeKeys | null>(initial || null)

  ssrUseEffect(() => {
    const bodyClasses = document.body.classList
    const classTheme = themes[theme]
    let changed = false

    if (!bodyClasses.contains(classTheme) && classTheme) {
      bodyClasses.add(classTheme)
      changed = true
    }

    return () => {
      if (changed) bodyClasses.remove(classTheme)
    }
  }, [theme])

  return [theme, setTheme]
}
