import { createContext } from 'react'
import type { Customer, Order, Package, Quotation, QuotationStatus, TrackingEvent } from '../types'

export type CustomerInput = Omit<Customer, 'id' | 'createdAt' | 'totalOrders'>
export type QuotationInput = Omit<Quotation, 'id' | 'createdAt' | 'status'>
export type OrderInput = Omit<Order, 'id' | 'orderCode' | 'createdAt' | 'status'>
export type PackageInput = Omit<Package, 'id' | 'packageCode' | 'createdAt' | 'status'>
export type TrackingEventInput = Omit<TrackingEvent, 'id' | 'createdAt'>

export type AppDataContextValue = {
  customers: Customer[]
  quotations: Quotation[]
  orders: Order[]
  packages: Package[]
  trackingEvents: TrackingEvent[]
  addCustomer: (input: CustomerInput) => void
  addQuotation: (input: QuotationInput) => void
  updateQuotationStatus: (id: string, status: QuotationStatus) => void
  convertQuotationToOrder: (quotation: Quotation) => void
  addOrder: (input: OrderInput) => void
  addPackage: (input: PackageInput) => void
  addTrackingEvent: (input: TrackingEventInput) => void
}

export const AppDataContext = createContext<AppDataContextValue | undefined>(undefined)

