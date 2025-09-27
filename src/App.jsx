import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import TicketSection from './components/TicketSection'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'

function App() {
  const [tickets, setTickets] = useState([])    
  const [taskStatus, setTaskStatus] = useState([])  
  const [resolvedTasks, setResolvedTasks] = useState([])  
  const [inProgressCount, setInProgressCount] = useState(0)
  const [resolvedCount, setResolvedCount] = useState(0)

   
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/public/Ticekts.json")  
        const data = await res.json()
        setTickets(data)
      } catch (error) {
        console.error("Error fetching tickets:", error)
      }
    }
    fetchTickets()
  }, [])

   
  const handleTicketClick = (ticketTitle) => {
    if (!taskStatus.includes(ticketTitle)) {
  setTaskStatus(prev => [...prev, ticketTitle])
  setInProgressCount(prev => prev + 1)

  toast("In-Progress")    
}
  }

   
  const handleComplete = (title) => {
    setTaskStatus(prev => prev.filter(t => t !== title))
    setResolvedTasks(prev => [...prev, title])
    setInProgressCount(prev => prev - 1)
    setResolvedCount(prev => prev + 1)

     
    setTickets(prev => prev.filter(ticket => ticket.title !== title))
  }

  return (
    <>
      <Navbar />
      <Banner inProgressCount={inProgressCount} resolvedCount={resolvedCount} />
      <TicketSection
        tickets={tickets}
        taskStatus={taskStatus}
        resolvedTasks={resolvedTasks}
        handleTicketClick={handleTicketClick}
        handleComplete={handleComplete}
      />
      <Footer></Footer>
      <ToastContainer />
    </>
  )
}

export default App
