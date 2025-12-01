import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const API_URL = "http://localhost:8000/api/tasks";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(API_URL)
        setTasks(res.data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchTasks()
  }, [])

  const addTask = async () => {
    try {
      await axios.post(API_URL, { title, status: 'pending' })
      setTitle('')
      // fetch updated tasks
      const res = await axios.get(API_URL)
      setTasks(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>TaskFlow MVP</h1>
      <input 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Nouvelle tâche..." 
      />
      <button onClick={addTask}>Ajouter</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
