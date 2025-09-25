import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import TicketSection from './components/TicketSection'
import { useState } from 'react'

function App() {
  const [inProgressCount, setInProgressCount] = useState(0)
  const [taskStatus, setTaskStatus] = useState([])

  const handleTicketClick = (ticketTitle) => {
    setInProgressCount(prev => prev + 1)
    setTaskStatus(prev => [...prev, ticketTitle])
  }

  return (
    <>
      <Navbar />
      <Banner inProgressCount={inProgressCount} />
      <TicketSection handleTicketClick={handleTicketClick} taskStatus={taskStatus} />
    </>
  )
}

export default App
