# Design System — Contexto para Claude

## O que é
Pacote npm `@jeffersonvianna-dev/design-system` publicado no **GitHub Packages**.
Consumido por todos os projetos React da Cactus Tech / SEDUC SP.

## Estrutura
```
design-system/
├── src/
│   ├── index.ts          ← entry point (importa CSS + re-exporta tudo)
│   ├── tokens.ts         ← tokens como objeto JS/TS
│   ├── styles.css        ← :root + todas as classes c-* de componente
│   └── components/       ← Button, Badge, Card, TabNav, ChipInput, HabBox
├── dist/                 ← output do build (não commitar)
├── index.html            ← showcase visual — MANTER SEMPRE ATUALIZADO
├── package.json
└── vite.config.ts
```

## Tokens principais
- `--blue: #005BAC` (primário)
- `--blue-pale: #e8f0f9` (fundo azul claro — padrão em todos os projetos)
- `--orange: #F47920` (secundário / AE)
- `--orange-light: #fff3e8`
- `--gray: #f5f6fa` (fundo de página)
- `--gray-mid: #dde2ec` (bordas)
- `--text: #1a1f36` / `--text-muted: #6b7280`
- `--radius: 12px` / `--shadow: 0 2px 12px rgba(0,0,0,.08)`
- `--font: 'Segoe UI', system-ui, sans-serif` / `--font-mono: monospace`

## Componentes exportados
`Button`, `Badge`, `Card`, `AulaCard`, `TabNav`, `ChipInput`, `HabBox`

## Regras obrigatórias
- Cores sempre via `var(--token)`, nunca hex direto
- Labels de campo: UPPERCASE + letter-spacing + weight 700+
- Códigos de habilidade: `font-family: var(--font-mono)`
- Cards: `box-shadow: var(--shadow)` + hover `var(--shadow-lg)`
- Transições: `transition: all .18s`
- Padding horizontal sempre 24px (header, filtros, tabs, content)
- max-width: 1100px (guia público) ou 1200px (CMS)

## Publicar nova versão
```bash
npm version patch
npm run build
npm publish
```

## Como consumir em projetos React
1. Adicionar `.npmrc`:
   ```
   @jeffersonvianna-dev:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```
2. `npm install @jeffersonvianna-dev/design-system`
3. Em `main.tsx`: `import '@jeffersonvianna-dev/design-system/css'` (inclui tokens + componentes)
4. Usar componentes: `import { Button, Badge } from '@jeffersonvianna-dev/design-system'`

## index.html
Showcase visual — referência de todos os componentes e tokens.
Sempre manter atualizado quando adicionar novos componentes.
