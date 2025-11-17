import React, { useEffect, useState } from 'react'

export default function SalesReport(){
  const [report, setReport] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5001/api/sales/report')
      .then(r=>r.json())
      .then(setReport)
  },[])

  return (
    <div>
      <h3>Reporte de Ventas por Cliente</h3>
      <table>
        <thead><tr><th>Cliente</th><th>Total Ventas</th></tr></thead>
        <tbody>
          {report.map((r,i)=> <tr key={i}><td>{r.customer}</td><td>{r.total_sales}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
