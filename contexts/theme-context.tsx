import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { tokens } from '../styles/tokens';

export type ThemeMode = 'light' | 'dark' | 'high-contrast';

interface Theme {
  mode: ThemeMode;
  colors: {
    bg: string;
    surface: string;
    'surface-2': string;
    text: string;
    'text-muted': string;
    divider: string;
    'chip-bg': string;
    'badge-bg': string;
    'elevation-overlay': string;
    brand: {
      primary: string;
      'primary-700': string;
      'primary-300': string;
      secondary: string;
      'secondary-700': string;
    };
    semantic: {
      success: string;
      info: string;
      warning: string;
      error: string;
    };
    states: {
      focus: string;
      pressed: string;
      hover: string;
      selected: string;
      'disabled-fg': string;
      'disabled-bg': string;
    };
  };
  fonts: typeof tokens.font;
  space: typeof tokens.space;
  radius: typeof tokens.radius;
  elevation: typeof tokens.elevation;
  opacity: typeof tokens.opacity;
  motion: typeof tokens.motion;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const createTheme = (mode: ThemeMode): Theme => {
  const baseColors = mode === 'high-contrast' 
    ? {
        bg: tokens.color.contrast['hc-bg'],
        surface: tokens.color.contrast['hc-surface'],
        'surface-2': tokens.color.contrast['hc-surface'],
        text: tokens.color.contrast['hc-text'],
        'text-muted': tokens.color.contrast['hc-text'],
        divider: tokens.color.contrast['hc-text'],
        'chip-bg': tokens.color.contrast['hc-surface'],
        'badge-bg': tokens.color.contrast['hc-text'],
        'elevation-overlay': 'rgba(255,255,255,0.1)',
      }
    : mode === 'dark'
    ? tokens.color.dark
    : tokens.color.light;

  return {
    mode,
    colors: {
      ...baseColors,
      brand: tokens.color.brand,
      semantic: tokens.color.semantic,
      states: tokens.color.states,
    },
    fonts: tokens.font,
    space: tokens.space,
    radius: tokens.radius,
    elevation: tokens.elevation,
    opacity: tokens.opacity,
    motion: tokens.motion,
  };
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  // Initialize theme based on system preference
  useEffect(() => {
    if (systemColorScheme === 'dark') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  }, [systemColorScheme]);

  const theme = createTheme(themeMode);

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const toggleTheme = () => {
    setThemeMode(prev => {
      switch (prev) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'high-contrast';
        case 'high-contrast':
          return 'light';
        default:
          return 'light';
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
