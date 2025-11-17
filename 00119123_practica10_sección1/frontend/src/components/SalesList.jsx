import React, { useEffect, useState } from 'react'

export default function SalesList(){
  const [sales, setSales] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5001/api/sales')
      .then(r=>r.json())
      .then(setSales)
  },[])

  return (
    <div>
      <h3>Listado de Ventas</h3>
      <table>
        <thead><tr><th>ID</th><th>Monto</th><th>Fecha</th><th>Cliente</th></tr></thead>
        <tbody>
          {sales.map(s=> (
            <tr key={s.id}><td>{s.id}</td><td>{s.amount}</td><td>{s.created_at}</td><td>{s.customer}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
