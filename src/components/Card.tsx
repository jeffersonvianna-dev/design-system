import React, { useState } from 'react'

// ─── Card genérico ───
export interface CardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Card({ children, className = '', style }: CardProps) {
  return (
    <div className={`c-aula-card ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}

// ─── AulaCard (expansível) ───
export interface AulaCardProps {
  numero: number
  titulo: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AulaCard({ numero, titulo, children, defaultOpen = false }: AulaCardProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`c-aula-card${open ? ' open' : ''}`}>
      <div className="c-aula-card-header" onClick={() => setOpen((o) => !o)}>
        <div className="c-aula-numero">{numero}</div>
        <div className="c-aula-titulo">{titulo}</div>
        <span className="c-expand-icon">▾</span>
      </div>
      {open && (
        <div className="c-aula-card-body">
          {children}
        </div>
      )}
    </div>
  )
}
