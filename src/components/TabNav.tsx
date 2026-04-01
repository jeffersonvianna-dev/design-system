import React from 'react'

export interface Tab {
  id: string
  label: string
  icon?: string
}

export interface TabNavProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
  /** max-width do conteúdo: 1100 para guia público, 1200 para CMS */
  maxWidth?: number
}

export function TabNav({ tabs, activeTab, onTabChange, maxWidth = 1100 }: TabNavProps) {
  return (
    <nav
      className="c-tabs-nav"
      style={{
        padding: `12px max(24px, calc((100% - ${maxWidth}px) / 2 + 24px))`,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`c-tab-btn${activeTab === tab.id ? ' active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
