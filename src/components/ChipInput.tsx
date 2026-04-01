import React, { useState, useRef } from 'react'

export interface ChipInputProps {
  /** Array de chips ativos */
  value: string[]
  onChange: (chips: string[]) => void
  /** Máximo de chips (undefined = ilimitado) */
  max?: number
  /** Função de validação async. Retorna true se o chip é válido. */
  validate?: (chip: string) => Promise<boolean> | boolean
  placeholder?: string
  label?: string
  disabled?: boolean
}

export function ChipInput({
  value,
  onChange,
  max,
  validate,
  placeholder = 'Adicionar...',
  label,
  disabled = false,
}: ChipInputProps) {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [validating, setValidating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function addChip(raw: string) {
    const chip = raw.trim().toUpperCase()
    if (!chip) return
    if (value.includes(chip)) { setInput(''); return }
    if (max !== undefined && value.length >= max) {
      setError(`Máximo de ${max} item${max !== 1 ? 's' : ''}`)
      return
    }
    if (validate) {
      setValidating(true)
      try {
        const ok = await validate(chip)
        if (!ok) { setError(`"${chip}" não encontrado`); return }
      } finally {
        setValidating(false)
      }
    }
    onChange([...value, chip])
    setInput('')
    setError(null)
  }

  function removeChip(chip: string) {
    if (disabled) return
    onChange(value.filter((c) => c !== chip))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      addChip(input)
    }
    if (e.key === 'Backspace' && !input && value.length > 0) {
      removeChip(value[value.length - 1])
    }
  }

  return (
    <div>
      {label && (
        <div className="c-campo-label" style={{ marginBottom: '8px' }}>{label}</div>
      )}
      <div
        className="c-campo"
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '6px', cursor: 'text',
          minHeight: '44px', alignItems: 'center',
          opacity: disabled ? 0.6 : 1,
        }}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {value.map((chip) => (
          <span
            key={chip}
            className="c-hab-chip"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'default' }}
          >
            {chip}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeChip(chip) }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0 2px', lineHeight: 1, color: 'inherit', fontWeight: 900,
                }}
                aria-label={`Remover ${chip}`}
              >
                ×
              </button>
            )}
          </span>
        ))}
        {!disabled && (
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(null) }}
            onKeyDown={handleKeyDown}
            onBlur={() => { if (input.trim()) addChip(input) }}
            placeholder={value.length === 0 ? placeholder : ''}
            style={{
              border: 'none', outline: 'none', flex: 1, minWidth: '120px',
              fontFamily: 'var(--font-mono)', background: 'transparent',
              fontSize: '.88rem', color: 'var(--text)',
            }}
          />
        )}
        {validating && (
          <span style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>verificando...</span>
        )}
      </div>
      {error && (
        <p style={{ color: '#dc2626', fontSize: '.75rem', margin: '4px 0 0' }}>{error}</p>
      )}
    </div>
  )
}
