#!/usr/bin/env node
/**
 * Design System Lint — Validação automática de conformidade
 *
 * Uso: node scripts/lint-ds.mjs <diretório>
 * Exemplo: node scripts/lint-ds.mjs src/
 *
 * Verifica:
 * 1. Nenhum hex (#rrggbb) fora de :root em arquivos CSS
 * 2. Nenhum style={{ }} com color/background/fontSize/fontFamily/fontWeight em JSX
 * 3. Nenhum font-family inline que não seja var(--font) ou var(--font-mono)
 * 4. Nenhuma constante de cor duplicada (const BLUE = '#...')
 *
 * Exit code: 0 se limpo, 1 se violações encontradas
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const dir = process.argv[2]
if (!dir) {
  console.error('Uso: node scripts/lint-ds.mjs <diretório>')
  process.exit(2)
}

const violations = []

function walk(dirPath) {
  for (const entry of readdirSync(dirPath)) {
    const full = join(dirPath, entry)
    if (entry === 'node_modules' || entry === 'dist' || entry === '.git') continue
    const stat = statSync(full)
    if (stat.isDirectory()) {
      walk(full)
    } else {
      const ext = extname(entry)
      if (['.css', '.jsx', '.tsx', '.ts'].includes(ext) && !entry.endsWith('.d.ts')) {
        lintFile(full, ext)
      }
    }
  }
}

function lintFile(filePath, ext) {
  const content = readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  const shortPath = filePath.replace(/\\/g, '/')

  if (ext === '.css') {
    lintCSS(shortPath, lines)
  } else {
    lintJSX(shortPath, lines, content)
  }
}

// ─── CSS Rules ───

function lintCSS(file, lines) {
  let inRoot = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const num = i + 1

    // Track :root block
    if (line.includes(':root')) inRoot = true
    if (inRoot && line.includes('}')) inRoot = false

    // Skip :root, comments, SVG data URIs
    if (inRoot) continue
    if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) continue
    if (line.includes('data:image/svg+xml')) continue
    if (line.includes('url(')) continue

    // Rule 1: No hex colors outside :root
    const hexMatch = line.match(/#[0-9a-fA-F]{3,8}\b/)
    if (hexMatch) {
      // Allow #fff and #000 as they're universal
      const hex = hexMatch[0].toLowerCase()
      if (hex !== '#fff' && hex !== '#ffffff' && hex !== '#000' && hex !== '#000000') {
        violations.push({
          file, line: num,
          rule: 'no-hex-outside-root',
          msg: `Hex color "${hexMatch[0]}" found outside :root — use var(--token)`,
          text: line.trim()
        })
      }
    }
  }
}

// ─── JSX/TSX Rules ───

function lintJSX(file, lines, content) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const num = i + 1

    // Rule 2: No inline style with color/background/fontSize/fontFamily/fontWeight
    // Check for style={{ ... }} patterns with these properties
    if (line.includes('style={{') || line.includes('style={')) {
      const styleProps = ['color:', 'background:', 'backgroundColor:', 'fontSize:', 'fontFamily:', 'fontWeight:', 'fontsize:', 'fontfamily:']
      for (const prop of styleProps) {
        if (line.toLowerCase().includes(prop)) {
          // Allow var(--*) references and dynamic expressions
          const afterProp = line.substring(line.toLowerCase().indexOf(prop))
          if (afterProp.includes('var(--')) continue // CSS var reference is OK
          if (afterProp.match(/:\s*[a-z_]+\b/) && !afterProp.match(/:\s*['"][^'"]*['"]/)) continue // variable reference

          violations.push({
            file, line: num,
            rule: 'no-inline-style-visual',
            msg: `Inline style with "${prop.replace(':', '')}" — use CSS class instead`,
            text: line.trim().substring(0, 120)
          })
          break // one violation per line is enough
        }
      }
    }

    // Rule 3: No hardcoded color constants
    const constColorMatch = line.match(/const\s+\w+\s*=\s*['"]#[0-9a-fA-F]{3,8}['"]/)
    if (constColorMatch) {
      violations.push({
        file, line: num,
        rule: 'no-hardcoded-color-const',
        msg: `Hardcoded color constant — import { tokens } from design-system instead`,
        text: line.trim()
      })
    }

    // Rule 4: No hex in JSX props (like stroke="#...")
    const jsxHexMatch = line.match(/(?:stroke|fill|color|background)=["']#[0-9a-fA-F]{3,8}["']/)
    if (jsxHexMatch) {
      violations.push({
        file, line: num,
        rule: 'no-hex-in-jsx-props',
        msg: `Hex color in JSX prop "${jsxHexMatch[0]}" — use tokens.colors.* instead`,
        text: line.trim().substring(0, 120)
      })
    }
  }
}

// ─── Run ───

try {
  walk(dir)
} catch (err) {
  console.error(`Erro ao processar: ${err.message}`)
  process.exit(2)
}

// ─── Report ───

if (violations.length === 0) {
  console.log('✅ Design System lint: 0 violações encontradas')
  process.exit(0)
}

console.log(`\n❌ Design System lint: ${violations.length} violação(ões) encontrada(s)\n`)

// Group by file
const byFile = {}
for (const v of violations) {
  if (!byFile[v.file]) byFile[v.file] = []
  byFile[v.file].push(v)
}

for (const [file, vs] of Object.entries(byFile)) {
  console.log(`\n  ${file}`)
  for (const v of vs) {
    console.log(`    L${v.line} [${v.rule}] ${v.msg}`)
    console.log(`    > ${v.text}`)
  }
}

console.log(`\nTotal: ${violations.length} violação(ões) em ${Object.keys(byFile).length} arquivo(s)\n`)
process.exit(1)
