// src/ui/App.tsx
import React, { useState } from 'react'
import LandingPage from './LandingPage'
import Tier3Demo from './Tier3Demo'
import './app.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing')

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-root-demo">
      <main className="main-content-demo">
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === 'demo' && <Tier3Demo onNavigate={handleNavigate} />}
      </main>
    </div>
  )
}
