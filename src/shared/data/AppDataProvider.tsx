import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AppDataContext, type AppDataContextValue } from './AppDataContext'
import { customersMock, ordersMock, packagesMock, quotationsMock, trackingEventsMock } from './mockData'
import type { Customer, Order, OrderStatus, Package, PackageStatus, Quotation, TrackingEvent } from '../types'

const nextCode = (prefix: string, count: number) => `${prefix}-2026-${String(count + 1).padStart(6, '0')}`

const packageStatusToOrderStatus: Record<PackageStatus, OrderStatus> = {
  REGISTERED: 'CREATED',
  RECEIVED_IN_USA: 'RECEIVED_IN_USA_WAREHOUSE',
  IN_TRANSIT: 'IN_TRANSIT_TO_PERU',
  ARRIVED_IN_PERU: 'ARRIVED_IN_PERU',
  READY_FOR_DELIVERY: 'READY_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(customersMock)
  const [quotations, setQuotations] = useState<Quotation[]>(quotationsMock)
  const [orders, setOrders] = useState<Order[]>(ordersMock)
  const [packages, setPackages] = useState<Package[]>(packagesMock)
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>(trackingEventsMock)

  const value = useMemo<AppDataContextValue>(
    () => ({
      customers,
      quotations,
      orders,
      packages,
      trackingEvents,
      addCustomer: (input) => {
        setCustomers((current) => [
          {
            ...input,
            id: `CUS-${String(current.length + 1).padStart(3, '0')}`,
            createdAt: new Date().toISOString(),
            totalOrders: 0,
          },
          ...current,
        ])
      },
      addQuotation: (input) => {
        setQuotations((current) => [
          {
            ...input,
            id: `QUO-${String(current.length + 1).padStart(3, '0')}`,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
          },
          ...current,
        ])
      },
      updateQuotationStatus: (id, status) => {
        setQuotations((current) => current.map((item) => (item.id === id ? { ...item, status } : item)))
      },
      convertQuotationToOrder: (quotation) => {
        setQuotations((current) =>
          current.map((item) => (item.id === quotation.id ? { ...item, status: 'CONVERTED_TO_ORDER' } : item)),
        )
        setOrders((current) => [
          {
            id: `ORD-${String(current.length + 1).padStart(3, '0')}`,
            orderCode: nextCode('ORD', current.length),
            customerName: quotation.customerName,
            productName: quotation.productName,
            totalUsd: quotation.totalUsd,
            status: 'CONFIRMED',
            createdAt: new Date().toISOString(),
          },
          ...current,
        ])
      },
      addOrder: (input) => {
        setOrders((current) => [
          {
            ...input,
            id: `ORD-${String(current.length + 1).padStart(3, '0')}`,
            orderCode: nextCode('ORD', current.length),
            status: 'CREATED',
            createdAt: new Date().toISOString(),
          },
          ...current,
        ])
      },
      addPackage: (input) => {
        setPackages((current) => [
          {
            ...input,
            id: `PKG-${String(current.length + 1).padStart(3, '0')}`,
            packageCode: nextCode('PKG', current.length),
            status: 'REGISTERED',
            createdAt: new Date().toISOString(),
          },
          ...current,
        ])
      },
      addTrackingEvent: (input) => {
        const createdAt = new Date().toISOString()
        setTrackingEvents((current) => [
          {
            ...input,
            id: `TRK-${String(current.length + 1).padStart(3, '0')}`,
            createdAt,
          },
          ...current,
        ])
        setPackages((current) =>
          current.map((item) =>
            item.packageCode === input.packageCode
              ? { ...item, status: input.status, currentLocation: input.location }
              : item,
          ),
        )
        setOrders((current) =>
          current.map((item) => {
            const relatedPackage = packages.find((packageItem) => packageItem.packageCode === input.packageCode)
            return relatedPackage?.orderCode === item.orderCode
              ? { ...item, status: packageStatusToOrderStatus[input.status] }
              : item
          }),
        )
      },
    }),
    [customers, orders, packages, quotations, trackingEvents],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

