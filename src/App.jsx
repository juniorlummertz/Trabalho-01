import { useEffect, useMemo, useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Review project documentation', priority: 'high', done: false },
  { id: 2, title: 'Publish the repository on GitHub', priority: 'medium', done: true },
]

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow.tasks')
    return savedTasks ? JSON.parse(savedTasks) : initialTasks
  })
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('taskflow.tasks', JSON.stringify(tasks))
  }, [tasks])

  const visibleTasks = useMemo(() => {
    if (filter === 'pending') return tasks.filter((task) => !task.done)
    if (filter === 'completed') return tasks.filter((task) => task.done)
    return tasks
  }, [filter, tasks])

  const completedCount = tasks.filter((task) => task.done).length
  const pendingCount = tasks.length - completedCount

  function addTask(event) {
    event.preventDefault()
    const normalizedTitle = title.trim()

    if (!normalizedTitle) return

    setTasks((currentTasks) => [
      {
        id: crypto.randomUUID(),
        title: normalizedTitle,
        priority,
        done: false,
      },
      ...currentTasks,
    ])
    setTitle('')
    setPriority('medium')
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <span className="eyebrow">React task manager</span>
          <h1>TaskFlow</h1>
          <p>Organize priorities, track progress, and keep your tasks saved locally.</p>
        </div>

        <div className="summary" aria-label="Task summary">
          <div>
            <strong>{tasks.length}</strong>
            <span>Total</span>
          </div>
          <div>
            <strong>{pendingCount}</strong>
            <span>Pending</span>
          </div>
          <div>
            <strong>{completedCount}</strong>
            <span>Done</span>
          </div>
        </div>
      </section>

      <section className="workspace">
        <form className="task-form" onSubmit={addTask}>
          <div className="field task-title-field">
            <label htmlFor="task-title">New task</label>
            <input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to be done?"
              maxLength={80}
            />
          </div>

          <div className="field">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button className="primary-button" type="submit">Add task</button>
        </form>

        <div className="toolbar">
          <h2>Your tasks</h2>
          <div className="filters" aria-label="Filter tasks">
            {['all', 'pending', 'completed'].map((option) => (
              <button
                className={filter === option ? 'filter active' : 'filter'}
                key={option}
                onClick={() => setFilter(option)}
                type="button"
              >
                {option[0].toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {visibleTasks.length > 0 ? (
          <ul className="task-list">
            {visibleTasks.map((task) => (
              <li className={task.done ? 'task-card completed' : 'task-card'} key={task.id}>
                <button
                  className="check-button"
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.done ? `Reopen ${task.title}` : `Complete ${task.title}`}
                >
                  {task.done ? '✓' : ''}
                </button>

                <div className="task-content">
                  <span className={`priority ${task.priority}`}>
                    {priorityLabels[task.priority]}
                  </span>
                  <p>{task.title}</p>
                </div>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span>✓</span>
            <h3>No tasks here</h3>
            <p>Add a new task or choose another filter.</p>
          </div>
        )}
      </section>

      <footer>Built with React, Vite, and localStorage.</footer>
    </main>
  )
}

export default App
