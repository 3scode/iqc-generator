import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Agentation } from 'agentation'
import { Header } from './components/layout/Header'
import { BottomNav } from './components/layout/BottomNav'
import { Toast } from './components/ui/Toast'
import { Creator } from './pages/Creator'
import { Templates } from './pages/Templates'
import { About } from './pages/About'
import { ExportPage } from './pages/ExportPage'
import { useUiStore } from './stores/uiStore'

function ErrorFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="neumorph-card p-8 text-center max-w-sm w-full">
        <p className="font-bold font-display text-lg text-[--color-foreground]">Error</p>
        <p className="text-sm text-[--color-muted] mt-2">Terjadi kesalahan sistem</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm font-medium text-[--color-accent] hover:underline cursor-pointer"
        >
          Muat ulang halaman
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const darkMode = useUiStore((s) => s.darkMode)
  const isExport = useLocation().pathname === '/export'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  if (isExport) {
    return (
      <Routes>
        <Route path="/export" element={<ExportPage />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-foreground] pb-20 md:pb-0">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Routes>
          <Route path="/" element={<Creator />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <BottomNav />
      <Toast />
      {import.meta.env.DEV && <Agentation />}
    </div>
  )
}

export { ErrorFallback }
