import { ArrowRight, Calculator, ClipboardList, PackageCheck, SearchCheck, ShieldCheck, Truck } from 'lucide-react'
import { Link } from 'react-router'
import heroImage from '../../assets/chalaquita-hero.png'

const benefits = [
  { title: 'Cotizaciones rápidas', description: 'Calcula costos y tiempos con una vista clara.', icon: Calculator },
  { title: 'Seguimiento de paquetes', description: 'Comparte un tracking público sin login del cliente.', icon: SearchCheck },
  { title: 'Gestión ordenada', description: 'Clientes, pedidos y paquetes desde un solo panel.', icon: ClipboardList },
  { title: 'Entregas confiables', description: 'Estados visibles para controlar cada avance.', icon: Truck },
]

const steps = [
  'Envías el producto que quieres traer.',
  'Se calcula la cotización.',
  'Se registra tu pedido.',
  'Recibes tracking de tu paquete.',
]

export function LandingPage() {
  return (
    <main>
      <section
        className="relative flex min-h-[76vh] items-center overflow-hidden bg-slate-950"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(2, 6, 23, 0.92), rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.22)), url(${heroImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-3 py-1 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/30">
              <PackageCheck className="size-4" aria-hidden="true" />
              Primera versión operativa
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
              Chalaquita Express
            </h1>
            <p className="mt-5 text-xl font-medium text-cyan-100">Compras en USA, entregas en Perú.</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
              Gestiona cotizaciones, controla paquetes y comparte tracking con tus clientes desde una experiencia
              moderna, simple y lista para presentar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/tracking" className="accent-button">
                Consultar tracking
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                <ShieldCheck className="size-4" aria-hidden="true" />
                Acceso administrativo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <article key={benefit.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-slate-950">{benefit.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{benefit.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-cyan-700">¿Cómo funciona?</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
              Un flujo simple para traer productos de USA a Perú.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Esta maqueta muestra el alcance inicial: operación interna para el equipo y tracking público para
              clientes sin necesidad de registro.
            </p>
          </div>
          <div className="grid gap-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-cyan-300">
                  {index + 1}
                </span>
                <p className="text-sm font-medium text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

