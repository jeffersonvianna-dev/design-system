/**
 * Design tokens — Cactus Tech / SEDUC SP
 * CSS custom properties como objeto JS/TS para uso em estilos inline ou temas.
 *
 * USO PRINCIPAL: Recharts e outras libs que exigem hex literal (não aceita CSS vars).
 * Para CSS, importar `@jeffersonvianna-dev/design-system/css`.
 *
 * Exemplo:
 *   import { tokens } from '@jeffersonvianna-dev/design-system'
 *   <XAxis tick={{ fill: tokens.colors.chartTick }} />
 */
export const tokens = {
  colors: {
    // Primárias
    blue: '#005BAC',
    bluePale: '#e8f0f9',
    blueBorder: '#c0d9f0',
    orange: '#F47920',
    orangeLight: '#fff3e8',
    orangeBorder: '#f5c99a',

    // Status
    green: '#16a34a',
    red: '#dc2626',
    yellow: '#ca8a04',
    purple: '#9333ea',

    // Status backgrounds
    redLight: '#fef2f2',
    greenLight: '#f0fdf4',
    yellowLight: '#fefce8',
    purpleLight: '#faf5ff',

    // Neutros
    gray: '#f5f6fa',
    grayMid: '#dde2ec',
    grayLight: '#f1f5f9',
    grayLighter: '#f8fafc',
    text: '#1a1f36',
    textMuted: '#6b7280',

    // Hover/stroke (derivadas)
    blueDark: '#004a8f',
    greenDark: '#15803d',
    redDark: '#b91c1c',
    yellowDark: '#a16207',
    purpleDark: '#7e22ce',
    grayDark: '#334155',

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

  fontSize: {
    xs: '0.69rem',    // 11px — labels
    sm: '0.78rem',    // 12.5px — chips
    base: '0.88rem',  // 14px — corpo
    md: '0.95rem',    // 15px — card title
    lg: '1.05rem',    // 17px — page title
    xl: '1.15rem',    // 18px — header h1
    hero: '1.3rem',   // 21px — hero
  },

  spacing: {
    px: '24px',
    maxWidthGuia: '1100px',
    maxWidthCms: '1200px',
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
