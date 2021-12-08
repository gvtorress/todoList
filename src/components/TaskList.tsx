import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
    id: number
    title: string
    isComplete: boolean
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState('')

    function handleCreateNewTask() {
        let idNumber = Math.floor(Math.random() * 1000)
        while (tasks.filter(e => e.id === idNumber).length > 0) {
            idNumber = Math.floor(Math.random() * 1000)
        }
        if (newTaskTitle !== '') {
            setTasks(prevState => [
                ...prevState,
                {
                    id: idNumber,
                    title: newTaskTitle,
                    isComplete: false
                }
            ])
        }
    }

    function handleToggleTaskCompletion(id: number) {
        const index = tasks.findIndex(e => e.id === id)
        let tasksUpdate = [...tasks]
        tasksUpdate[index].isComplete = !tasksUpdate[index].isComplete
        setTasks(tasksUpdate)
    }

    function handleRemoveTask(id: number) {
        const index = tasks.findIndex(e => e.id === id)
        setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)])
    }

    return (
        <section className="task-list container">
            <header>
                <h2>Minhas tasks</h2>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Adicionar novo todo"
                        onChange={e => setNewTaskTitle(e.target.value)}
                        value={newTaskTitle}
                    />
                    <button
                        type="submit"
                        data-testid="add-task-button"
                        onClick={handleCreateNewTask}
                    >
                        <FiCheckSquare size={16} color="#fff" />
                    </button>
                </div>
            </header>

            <main>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <div
                                className={task.isComplete ? 'completed' : ''}
                                data-testid="task"
                            >
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        readOnly
                                        checked={task.isComplete}
                                        onClick={() =>
                                            handleToggleTaskCompletion(task.id)
                                        }
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <p>{task.title}</p>
                            </div>

                            <button
                                type="button"
                                data-testid="remove-task-button"
                                onClick={() => handleRemoveTask(task.id)}
                            >
                                <FiTrash size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    )
}
