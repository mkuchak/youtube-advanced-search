import { createContext, ReactNode, useEffect, useState } from 'react'

interface DarkModeContextData {
  toggleDarkMode(): Promise<void>;
  darkMode: boolean;
}

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeContext = createContext({} as DarkModeContextData)

export function DarkModeProvider ({ children }: DarkModeProviderProps) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }, [])

  const toggleDarkMode = async () => {
    document.documentElement.classList.toggle('dark')
    localStorage.setItem(
      'color-theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    )
    setDarkMode(!darkMode)
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
