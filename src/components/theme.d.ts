type ThemeMode = "light" | "dark"

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: ThemeMode;
    storageKey?: string;
}

interface ThemeProviderState {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}