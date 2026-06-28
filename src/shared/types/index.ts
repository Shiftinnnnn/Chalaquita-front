export type QuotationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CONVERTED_TO_ORDER'

export type OrderStatus =
  | 'CREATED'
  | 'CONFIRMED'
  | 'PURCHASED_IN_USA'
  | 'RECEIVED_IN_USA_WAREHOUSE'
  | 'IN_TRANSIT_TO_PERU'
  | 'ARRIVED_IN_PERU'
  | 'READY_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'

export type PackageStatus =
  | 'REGISTERED'
  | 'RECEIVED_IN_USA'
  | 'IN_TRANSIT'
  | 'ARRIVED_IN_PERU'
  | 'READY_FOR_DELIVERY'
  | 'DELIVERED'

export type Customer = {
  id: string
  name: string
  email: string
  phone: string
  documentNumber: string
  createdAt: string
  totalOrders: number
}

export type Quotation = {
  id: string
  customerName: string
  productName: string
  productUrl: string
  productPriceUsd: number
  estimatedWeight: number
  shippingCost: number
  serviceFee: number
  totalUsd: number
  estimatedDays: number
  status: QuotationStatus
  createdAt: string
}

export type Order = {
  id: string
  orderCode: string
  customerName: string
  productName: string
  totalUsd: number
  status: OrderStatus
  createdAt: string
}

export type Package = {
  id: string
  packageCode: string
  orderCode: string
  customerName: string
  weight: number
  dimensions: string
  description: string
  status: PackageStatus
  currentLocation: string
  createdAt: string
}

export type TrackingEvent = {
  id: string
  packageCode: string
  status: PackageStatus
  title: string
  description: string
  location: string
  createdAt: string
}

