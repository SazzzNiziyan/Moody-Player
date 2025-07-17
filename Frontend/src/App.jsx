import { useState } from 'react'
import FacialExpression from "./components/FacialExpression"
import './App.css'
import MoodSongs from './components/MoodSongs'

function App() {


  return (
    <>
      <FacialExpression />
      <MoodSongs />
    </>
  )
}

export default App