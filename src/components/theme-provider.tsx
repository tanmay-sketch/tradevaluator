"use client"

import * as React from "react"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: "light" | "dark" | "system"
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

const ThemeContext = React.createContext<{
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}>({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "valpick-theme",
  attribute = "data-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">(defaultTheme)
  
  // Initialize theme state from localStorage after mount
  React.useEffect(() => {
    const savedTheme = typeof window !== "undefined" 
      ? localStorage.getItem(storageKey) as "light" | "dark" | "system" 
      : null
    
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [storageKey])
  
  React.useEffect(() => {
    if (typeof window === "undefined") return
    
    const root = window.document.documentElement
    
    // Remove old classes
    root.classList.remove('light', 'dark')
    
    // Add transition styles if needed
    if (disableTransitionOnChange) {
      document.documentElement.classList.add("disable-transitions")
      window.setTimeout(() => {
        document.documentElement.classList.remove("disable-transitions")
      }, 0)
    }
    
    // Set the theme attribute
    let resolvedTheme = theme
    
    // Handle system theme preference
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      resolvedTheme = systemTheme
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => {
        const newTheme = mediaQuery.matches ? "dark" : "light"
        root.classList.remove('light', 'dark')
        root.classList.add(newTheme)
      }
      
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
    
    root.classList.add(resolvedTheme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey, attribute, disableTransitionOnChange, enableSystem])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (theme: "light" | "dark" | "system") => setTheme(theme),
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
} 