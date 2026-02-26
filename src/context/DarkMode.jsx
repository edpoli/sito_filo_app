import { createContext, useContext, useState, useEffect } from 'react'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('darkMode') === 'true'
    if (saved) document.documentElement.classList.add('dark')
    return saved
  })

  useEffect(() => {
    localStorage.setItem('darkMode', dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggle = () => setDark(d => !d)

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => useContext(DarkModeContext)
