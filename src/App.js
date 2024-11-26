import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount } from './redux/reducers/counterSlice'
import { getProductThunk } from './redux/reducers/productsSlice'
import { postFormThunk } from './redux/reducers/formSlice'

const App = () => {

  const [name, setName] = useState('')

  const count = useSelector((state) => state.counter.value)

  const products = useSelector((state) => state.products.products)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  const formError = useSelector((state) => state.form.error)
  

  const dispacth = useDispatch()

  useEffect(() => {
    dispacth(getProductThunk())
  }, [])


  const sendName = () => {
    dispacth(postFormThunk({name:name}))
  }

  if (loading) return <p>LLOOOAAADDDIIINNNNGGG</p>
  if (error) return <p>Xeta bas verdi</p>
  if (formError) return <p>Gondererken Xeta bas verdi</p>

  return (
    <div>
      <input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
      <button onClick={() => sendName()}>SEND YOUR NAME</button>


    </div>
  )
}

export default App