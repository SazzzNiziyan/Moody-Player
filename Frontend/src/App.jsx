import { useState } from 'react'
import FacialExpression from "./components/FacialExpression"
import './App.css'
import MoodSongs from './components/MoodSongs'

function App() {

  const [ Song, setSongs ] = useState([
       
    ])

  return (
    <>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs Songs={Song} />
    </>
  )
}

export default App