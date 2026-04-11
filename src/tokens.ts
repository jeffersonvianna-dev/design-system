/**
 * Design tokens — Cactus Tech / SEDUC SP
 * CSS custom properties como objeto JS/TS para uso em estilos inline ou temas.
 * Para uso em CSS, importar `@jeffersonvianna-dev/design-system/css`.
 */
export const tokens = {
  colors: {
    blue: '#005BAC',
    bluePale: '#e8f0f9',
    blueBorder: '#c0d9f0',
    orange: '#F47920',
    orangeLight: '#fff3e8',
    orangeBorder: '#f5c99a',
    gray: '#f5f6fa',
    grayMid: '#dde2ec',
    grayLight: '#f1f5f9',
    grayLighter: '#f8fafc',
    text: '#1a1f36',
    textMuted: '#6b7280',
    green: '#16a34a',
    red: '#dc2626',
    yellow: '#ca8a04',
    purple: '#9333ea',
    // Status backgrounds
    redLight: '#fef2f2',
    greenLight: '#f0fdf4',
    yellowLight: '#fefce8',
    purpleLight: '#faf5ff',
    // Chart / Data viz
    chartGrid: '#f1f5f9',
    chartRef: '#94a3b8',
    chartLabel: '#475569',
    chartTick: '#64748b',
  },
  shadows: {
    sm: '0 2px 8px rgba(0,0,0,.2)',
    md: '0 2px 12px rgba(0,0,0,.08)',
    lg: '0 4px 18px rgba(0,0,0,.11)',
  },
  radius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    pill: '20px',
  },
  font: {
    sans: "'Segoe UI', system-ui, sans-serif",
    mono: 'monospace',
  },
  spacing: {
    /** Padding horizontal padrão em header, tabs, filtros e content */
    px: '24px',
    /** max-width do guia público */
    maxWidthGuia: '1100px',
    /** max-width do CMS / dashboard */
    maxWidthCms: '1200px',
    /** Escala de espaçamento (base 4px) */
    sp1: '4px',
    sp2: '8px',
    sp3: '12px',
    sp4: '16px',
    sp5: '20px',
    sp6: '24px',
    sp8: '32px',
    sp12: '48px',
  },
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    modal: 300,
    toast: 400,
  },
} as const

export type Tokens = typeof tokens
