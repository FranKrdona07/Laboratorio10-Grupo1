import React from 'react'
import CustomerList from './components/CustomerList'
import SalesForm from './components/SalesForm'
import SalesList from './components/SalesList'
import SalesReport from './components/SalesReport'

export default function App(){
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>Práctica 10 - Clientes y Ventas</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ border: '1px solid #ddd', padding: 12 }}>
          <CustomerList />
        </div>
        <div style={{ border: '1px solid #ddd', padding: 12 }}>
          <SalesForm />
        </div>
        <div style={{ gridColumn: '1 / -1', border: '1px solid #ddd', padding: 12 }}>
          <h2>Ventas</h2>
          <SalesList />
          <hr/>
          <SalesReport />
        </div>
      </div>
    </div>
  )
}
