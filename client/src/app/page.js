'use client'
import React, { useEffect, useState } from "react"
const App = () => {
  const [data, setData] = useState('Loading...')

  useEffect(() => {
    fetch("http://localhost:61255/abcd")
      .then(res => res.json())
      .then(data => setData(data.name))
  }, [])

  return (
    <div className="App">
      Hello World
      <p>Test API: {data}</p>
    </div>
  )
}

export default App