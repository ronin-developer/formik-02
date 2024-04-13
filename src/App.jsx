import React from 'react'
import FormComponent from './components/FormComponent'

function App() {
  return (
    <div className='container flex flex-col items-center justify-center bg-darkgrey/30 h-lvh mx-auto rounded-lg font-Josefinans'>
      <h1 className='p-2 m-2 text-3xl text-tomato bg-mygrey rounded-md'>Registration form</h1>
      <FormComponent />
    </div>
  )
}

export default App