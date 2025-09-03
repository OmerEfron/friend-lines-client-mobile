// Design tokens based on Friendlines Design System
export const tokens = {
  color: {
    brand: {
      primary: '#2D5BFF',
      'primary-700': '#1E3EE6',
      'primary-300': '#6E8BFF',
      secondary: '#FFC247',
      'secondary-700': '#D79C1F',
    },
    neutral: {
      '0': '#FFFFFF',
      '50': '#F8FAFC',
      '100': '#F1F5F9',
      '200': '#E2E8F0',
      '300': '#CBD5E1',
      '400': '#94A3B8',
      '500': '#64748B',
      '600': '#475569',
      '700': '#334155',
      '800': '#1F2937',
      '900': '#0B121A',
    },
    semantic: {
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    states: {
      focus: '#2D5BFF',
      pressed: 'rgba(45,91,255,0.12)',
      hover: 'rgba(45,91,255,0.08)',
      selected: 'rgba(45,91,255,0.16)',
      'disabled-fg': '#94A3B8',
      'disabled-bg': '#E2E8F0',
    },
    light: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      'surface-2': '#F1F5F9',
      text: '#1F2937',
      'text-muted': '#475569',
      divider: '#E2E8F0',
      'chip-bg': '#F1F5F9',
      'badge-bg': '#2D5BFF',
      'elevation-overlay': 'rgba(0,0,0,0.02)',
    },
    dark: {
      bg: '#0B121A',
      surface: '#0E141C',
      'surface-2': '#121A23',
      text: '#F1F5F9',
      'text-muted': '#94A3B8',
      divider: 'rgba(255,255,255,0.08)',
      'chip-bg': '#18202A',
      'badge-bg': '#6E8BFF',
      'elevation-overlay': 'rgba(255,255,255,0.04)',
    },
    contrast: {
      'hc-bg': '#000000',
      'hc-surface': '#0B0B0B',
      'hc-text': '#FFFFFF',
      'hc-focus': '#FFD60A',
    },
  },
  font: {
    families: {
      ios: 'System',
      android: 'Roboto',
      fallback: 'Segoe UI, Helvetica, Arial',
    },
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 22,
      '2xl': 26,
      '3xl': 32,
    },
    lineHeight: {
      tight: 1.2,
      snug: 1.35,
      normal: 1.5,
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    roles: {
      headline: {
        size: 26,
        weight: '700',
        lh: 1.35,
      },
      title: {
        size: 22,
        weight: '600',
        lh: 1.35,
      },
      subhead: {
        size: 18,
        weight: '500',
        lh: 1.5,
      },
      body: {
        size: 16,
        weight: '400',
        lh: 1.5,
      },
      caption: {
        size: 14,
        weight: '400',
        lh: 1.5,
      },
      meta: {
        size: 12,
        weight: '500',
        lh: 1.2,
      },
    },
  },
  space: {
    '0': 0,
    '1': 4,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '7': 32,
    '8': 40,
  },
  radius: {
    none: 0,
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    pill: 999,
  },
  elevation: {
    '0': {
      ios: {
        shadowColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
      },
      android: { elevation: 0 },
    },
    '1': {
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 1 },
    },
    '2': {
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
    },
    '3': {
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 3 },
    },
    '4': {
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.12,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 4 },
    },
    '5': {
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.16,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 12 },
      },
      android: { elevation: 6 },
    },
  },
  opacity: {
    '0': 0,
    '4': 0.04,
    '8': 0.08,
    '12': 0.12,
    '16': 0.16,
    '24': 0.24,
    '40': 0.4,
    '60': 0.6,
    '80': 0.8,
    '100': 1,
  },
  motion: {
    duration: {
      fast: 80,
      normal: 160,
      slow: 240,
    },
    easing: {
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0.0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: { damping: 16, mass: 1, stiffness: 220 },
    },
  },
} as const;

// Type definitions for design tokens
export type ColorToken = keyof typeof tokens.color;
export type FontSizeToken = keyof typeof tokens.font.size;
export type FontWeightToken = keyof typeof tokens.font.weight;
export type SpaceToken = keyof typeof tokens.space;
export type RadiusToken = keyof typeof tokens.radius;
export type ElevationToken = keyof typeof tokens.elevation;
