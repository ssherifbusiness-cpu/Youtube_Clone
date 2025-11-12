import { useState } from 'react'
import './App.css'
import React from 'react'

import Headbar from './modules/headbar.tsx'
import Sidebar from './modules/sidebar.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Headbar />
        <Sidebar />
    </>
  )
}

export default App
