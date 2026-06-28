const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/51999999999?text=Hola%20Chalaquita%20Express%2C%20quiero%20hacer%20una%20consulta.',
    imageSrc: '/socialmedia/Whatsapp-Logo.png',
    className: 'bg-white shadow-lg shadow-brand-red/20 hover:bg-brand-surface',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/chalaquitaexpress/',
    imageSrc: '/socialmedia/Instagram-Logo.png',
    className: 'border border-brand-navy/10 bg-white text-brand-navy shadow-sm hover:bg-brand-surface',
  },
]

export function PublicSocialLinks() {
  return (
    <div className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col items-end gap-2 sm:right-6">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={`group flex size-11 items-center justify-center rounded-full transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-red/25 ${link.className}`}
          aria-label={link.label}
          title={link.label}
        >
          <img src={link.imageSrc} alt="" className="size-7 object-contain" aria-hidden="true" />
          <span className="pointer-events-none absolute right-14 rounded-lg bg-brand-navy px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus:opacity-100">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  )
}