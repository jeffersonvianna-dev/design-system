import React from 'react'

export type BadgeVariant =
  | 'badge'      // .c-badge (azul pill)
  | 'hab'        // .c-hab-chip (código de habilidade, clicável)
  | 'hab-lg'     // .c-hab-chip-lg (habilidade, com borda)
  | 'ae'         // .c-ae-badge (laranja AE)
  | 'ae-nav'     // .c-ae-badge.nav (AE clicável)
  | 'seg-af'     // .c-seg-tag.af
  | 'seg-em'     // .c-seg-tag.em
  | 'bim'        // .c-bim-chip (bimestre laranja)
  | 'semana'     // .c-semana-chip (semana azul)

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  badge: 'c-badge',
  hab: 'c-hab-chip',
  'hab-lg': 'c-hab-chip-lg',
  ae: 'c-ae-badge',
  'ae-nav': 'c-ae-badge nav',
  'seg-af': 'c-seg-tag af',
  'seg-em': 'c-seg-tag em',
  bim: 'c-bim-chip',
  semana: 'c-semana-chip',
}

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  onClick?: () => void
  title?: string
}

export function Badge({
  variant = 'badge',
  children,
  className = '',
  onClick,
  title,
}: BadgeProps) {
  return (
    <span
      className={`${VARIANT_CLASS[variant]} ${className}`.trim()}
      onClick={onClick}
      title={title}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      {children}
    </span>
  )
}
