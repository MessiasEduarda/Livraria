export const theme = {
  colors: {
    background: '#ffffff',
    foreground: '#171717',
    primary: '#000000',
    secondary: '#666666',
    accent: '#0070f3',
  },
  fonts: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
    cabourg: 'var(--font-cabourg-regular)',
    cabourgBold: 'var(--font-cabourg-bold)',
    inter: 'var(--font-inter-variable-regular)',
    interItalic: 'var(--font-inter-variable)',
    metropolis: 'var(--font-metropolis-regular)',
    metropolisSemiBold: 'var(--font-metropolis-semibold)',
    roboto: 'var(--font-roboto-regular)',
    robotoMedium: 'var(--font-roboto-medium)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
};

export type Theme = typeof theme;