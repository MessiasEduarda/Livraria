/**
 * Breakpoints responsivos - uso em styled-components:
 * @media (max-width: ${breakpoints.tablet}) { ... }
 * Ou: @media (min-width: ${breakpoints.desktop}) { ... }
 */
export const breakpoints = {
  /** Telas grandes (monitores grandes) - opcional */
  largeDesktop: '1600px',
  /** Desktop padrão */
  desktop: '1200px',
  /** Tablet landscape / netbook - sidebar some */
  tabletLandscape: '1024px',
  /** Tablet */
  tablet: '768px',
  /** Celular landscape / tablet pequeno */
  mobileLandscape: '576px',
  /** Celular portrait */
  mobile: '400px',
} as const;

/** Media query helpers para max-width (mobile-first) */
export const mediaMax = {
  largeDesktop: `@media (max-width: ${breakpoints.largeDesktop})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  tabletLandscape: `@media (max-width: ${breakpoints.tabletLandscape})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  mobileLandscape: `@media (max-width: ${breakpoints.mobileLandscape})`,
  mobile: `@media (max-width: ${breakpoints.mobile})`,
} as const;

/** Padding/margin do container por breakpoint - valor em px */
export const containerPadding = {
  desktop: 40,
  tabletLandscape: 24,
  tablet: 20,
  mobileLandscape: 16,
  mobile: 12,
} as const;
