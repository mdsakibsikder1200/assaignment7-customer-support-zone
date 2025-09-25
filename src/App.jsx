import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import TicketSection from './components/TicketSection'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'

function App() {
  const [tickets, setTickets] = useState([]) // all tickets from JSON
  const [taskStatus, setTaskStatus] = useState([]) // pending tasks
  const [resolvedTasks, setResolvedTasks] = useState([]) // completed tasks
  const [inProgressCount, setInProgressCount] = useState(0)
  const [resolvedCount, setResolvedCount] = useState(0)

  // Fetch tickets from public folder
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/public/Ticekts.json") // check JSON file path
        const data = await res.json()
        setTickets(data)
      } catch (error) {
        console.error("Error fetching tickets:", error)
      }
    }
    fetchTickets()
  }, [])

  // Click on a ticket card
  const handleTicketClick = (ticketTitle) => {
    if (!taskStatus.includes(ticketTitle)) {
      setTaskStatus(prev => [...prev, ticketTitle])
      setInProgressCount(prev => prev + 1)

      // React Toastify alert
      toast.info("In-Progress", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  // Complete a task
  const handleComplete = (title) => {
    setTaskStatus(prev => prev.filter(t => t !== title))
    setResolvedTasks(prev => [...prev, title])
    setInProgressCount(prev => prev - 1)
    setResolvedCount(prev => prev + 1)

    // Remove card from left-side tickets
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
