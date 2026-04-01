import React from 'react'

export interface HabBoxProps {
  code: string
  meta?: string  // ex: "AE1 · Bim 1"
  selected?: boolean
  onClick?: () => void
}

export function HabBox({ code, meta, selected = false, onClick }: HabBoxProps) {
  return (
    <div
      className={`c-hab-box${selected ? ' selected' : ''}`}
      onClick={onClick}
    >
      <span className="c-hab-code">{code}</span>
      {meta && <span className="c-hab-box-meta">{meta}</span>}
    </div>
  )
}
