import { AppRouter } from './router/AppRouter'
import { AppDataProvider } from '../shared/data/AppDataProvider'

export default function App() {
  return (
    <AppDataProvider>
      <AppRouter />
    </AppDataProvider>
  )
}
