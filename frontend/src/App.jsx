import react, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState("")

  useEffect(() => {
    axios.get("/api/user")
      .then((response) => {
        console.log("Response : ", response)
        setJokes(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <h1 className='text-3xl text-rose-700'>{jokes}</h1>
    </>
  )
}

export default App
