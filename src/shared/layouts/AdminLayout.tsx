import { useState } from 'react'
import { Outlet } from 'react-router'
import { AppHeader } from '../components/AppHeader'
import { AppSidebar } from '../components/AppSidebar'

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-brand-panel text-brand-navy lg:flex">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

