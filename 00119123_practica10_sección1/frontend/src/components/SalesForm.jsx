import React, { useEffect, useState } from 'react'

export default function SalesForm(){
  const [customers, setCustomers] = useState([])
  const [amount, setAmount] = useState('')
  const [idCustomer, setIdCustomer] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    fetch('http://localhost:5001/api/customers')
      .then(r=>r.json())
      .then(setCustomers)
  },[])

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await fetch('http://localhost:5001/api/sales', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ amount: Number(amount), id_customer: Number(idCustomer) })
      })
      const data = await res.json()
      setMsg(data.message || data.error)
    }catch(err){
      setMsg('Error al enviar')
    }
  }

  return (
    <div>
      <h2>Registrar Venta</h2>
      <form onSubmit={submit}>
        <div style={{marginBottom:8}}>
          <input type="number" step="0.01" placeholder="Monto" value={amount} onChange={e=>setAmount(e.target.value)} />
          <select value={idCustomer} onChange={e=>setIdCustomer(e.target.value)}>
            <option value="">Seleccione cliente</option>
            {customers.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button type="submit">Guardar</button>
        </div>
      </form>
      {msg && <div><strong>{msg}</strong></div>}
    </div>
  )
}
