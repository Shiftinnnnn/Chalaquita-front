import { ArrowRight, Calculator, ClipboardList, PackageCheck, SearchCheck, ShieldCheck, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import heroImage from '../../assets/chalaquita-hero.png'

const benefits = [
  { title: 'Cotizacion sin vueltas', description: 'Envianos el producto y recibe un estimado claro antes de comprar.', icon: Calculator },
  { title: 'Tracking siempre a mano', description: 'Consulta el avance de tu paquete con tu codigo, sin crear una cuenta.', icon: SearchCheck },
  { title: 'Acompanamiento en cada paso', description: 'Te guiamos desde la cotizacion hasta la llegada de tu pedido.', icon: ClipboardList },
  { title: 'Entrega con tranquilidad', description: 'Sigue los cambios importantes hasta que tu compra llegue a tus manos.', icon: Truck },
]

const steps = [
  {
    title: 'Envianos el producto',
    description: 'Comparte el link, foto o detalle del producto que quieres traer desde USA.',
    detail: 'Mandanos el enlace o una referencia del producto. Revisamos la informacion y te orientamos sobre la mejor forma de traerlo.',
    metric: 'Solicitud recibida',
    icon: SearchCheck,
  },
  {
    title: 'Recibe tu cotizacion',
    description: 'Te compartimos costo estimado, comision, peso aproximado y tiempo de entrega.',
    detail: 'Antes de confirmar, sabes cuanto pagarias, que incluye el servicio y el tiempo estimado para recibir tu compra.',
    metric: 'Costo claro',
    icon: Calculator,
  },
  {
    title: 'Confirma tu compra',
    description: 'Cuando apruebas la cotizacion, coordinamos la compra y el envio.',
    detail: 'Nos encargamos de ordenar el proceso para que tu pedido quede registrado y puedas recibir novedades sin complicarte.',
    metric: 'Compra en proceso',
    icon: ClipboardList,
  },
  {
    title: 'Consulta tu tracking',
    description: 'Recibe un codigo para revisar el avance de tu paquete cuando quieras.',
    detail: 'Desde almacen hasta entrega, puedes ver los avances principales de tu paquete en una pagina simple y publica.',
    metric: 'Seguimiento online',
    icon: PackageCheck,
  },
]

export function LandingPage() {
  const [activeStep, setActiveStep] = useState(0)
  const currentStep = steps[activeStep]
  const ActiveIcon = currentStep.icon
  const progress = ((activeStep + 1) / steps.length) * 100

  return (
    <main>
      <section
        className="relative flex min-h-[76vh] items-center overflow-hidden bg-brand-navy"
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(var(--brand-navy-rgb) / 94%), rgb(var(--brand-navy-rgb) / 78%), rgb(var(--brand-navy-rgb) / 20%)), url(${heroImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-red/15 px-3 py-1 text-sm font-semibold text-white ring-1 ring-brand-red/30">
              <PackageCheck className="size-4" aria-hidden="true" />
              Compras de USA a Peru
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
              Chalaquita Express
            </h1>
            <p className="mt-5 text-xl font-medium text-white/85">Trae tus compras de USA sin hacerlo complicado.</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
              Te ayudamos a cotizar, comprar y seguir tu paquete desde una experiencia clara, cercana y pensada para
              que sepas que pasa con tu pedido.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/tracking" className="accent-button">
                Consultar mi tracking
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                <ShieldCheck className="size-4" aria-hidden="true" />
                Soy parte del equipo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <article
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-lg border border-brand-red/20 bg-brand-navy p-5 text-white shadow-lg shadow-brand-navy/10 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-brand-red" />
                  <div className="flex size-11 items-center justify-center rounded-lg bg-white/10 text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-white">{benefit.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/75">{benefit.description}</p>
                
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-surface py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-brand-navy/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-normal text-brand-red">Como funciona</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-normal text-brand-navy">
                  Tu compra de USA, explicada paso a paso.
                </h2>
                <p className="mt-4 text-sm leading-6 text-brand-soft-text">
                  En cuatro momentos sabes que enviar, cuanto pagar, cuando confirmar y como revisar el avance de tu
                  paquete.
                </p>
              </div>

              <div className="rounded-lg bg-brand-surface p-5">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-red text-white">
                    <ActiveIcon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-brand-muted">
                      Paso {activeStep + 1} de {steps.length}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-normal text-brand-navy">{currentStep.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-brand-soft-text">{currentStep.detail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div className="h-2 overflow-hidden rounded-full bg-brand-panel">
                <div className="h-full rounded-full bg-brand-red transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-4">
                {steps.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    className={`rounded-lg border p-3 text-left transition ${
                      activeStep === index
                        ? 'border-brand-red/30 bg-brand-red/10'
                        : 'border-brand-navy/10 bg-white hover:border-brand-navy/20 hover:bg-brand-surface'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <span
                      className={`mb-3 flex size-8 items-center justify-center rounded-lg text-xs font-bold ${
                        activeStep === index ? 'bg-brand-red text-white' : 'bg-brand-navy text-white'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="block text-sm font-semibold text-brand-navy">{step.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-brand-muted">{step.metric}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
