import type { OrderStatus, PackageStatus, QuotationStatus } from '../types'

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))

export const formatUsd = (value: number) =>
  new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'USD',
  }).format(value)

export const maskCustomerName = (name: string) => {
  const [firstName, lastName] = name.split(' ')
  return `${firstName} ${lastName ? `${lastName.charAt(0)}.` : ''}`.trim()
}

export const quotationStatusLabels: Record<QuotationStatus, string> = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobada',
  REJECTED: 'Rechazada',
  CONVERTED_TO_ORDER: 'Convertida',
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  CREATED: 'Creado',
  CONFIRMED: 'Confirmado',
  PURCHASED_IN_USA: 'Comprado en USA',
  RECEIVED_IN_USA_WAREHOUSE: 'En almacén USA',
  IN_TRANSIT_TO_PERU: 'En tránsito a Perú',
  ARRIVED_IN_PERU: 'Llegó a Perú',
  READY_FOR_DELIVERY: 'Listo para entrega',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
}

export const packageStatusLabels: Record<PackageStatus, string> = {
  REGISTERED: 'Registrado',
  RECEIVED_IN_USA: 'Recibido en USA',
  IN_TRANSIT: 'En tránsito',
  ARRIVED_IN_PERU: 'Llegó a Perú',
  READY_FOR_DELIVERY: 'Listo para entrega',
  DELIVERED: 'Entregado',
}

export const getStatusLabel = (status: QuotationStatus | OrderStatus | PackageStatus | string) => {
  if (status in quotationStatusLabels) return quotationStatusLabels[status as QuotationStatus]
  if (status in orderStatusLabels) return orderStatusLabels[status as OrderStatus]
  if (status in packageStatusLabels) return packageStatusLabels[status as PackageStatus]
  return status
}

export const getTrackingUrl = (code: string) => {
  const origin = typeof window === 'undefined' ? 'http://localhost:5173' : window.location.origin
  return `${origin}/tracking/${code}`
}

