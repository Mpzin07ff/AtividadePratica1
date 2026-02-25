import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '../schemas/taskSchema'
import { useState, useEffect } from 'react'
import { z } from 'zod'

type TaskForm = z.infer<typeof taskSchema>

interface Task {
  id: number
  title: string
  category: 'Trabalho' | 'Pessoal' | 'Urgente'
}

function TaskMaster() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema)
  })

  const onSubmit = (data: TaskForm) => {
    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      category: data.category,
    }
    setTasks([...tasks, newTask]) 
    reset() 
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const categoryColor: Record<Task['category'], string> = {
    Trabalho: 'bg-purple-700',
    Pessoal: 'bg-purple-700',
    Urgente: 'bg-purple-700',
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-400 mb-8"> TaskMaster</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 rounded-2xl p-6 mb-8 flex flex-col gap-4 max-w-lg">
        <div>
          <input
            {...register('title')}
            placeholder="Título da tarefa (mín. 5 caracteres)"
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <select
            {...register('category')}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Urgente">Urgente</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 rounded-lg px-6 py-2 font-bold transition-colors"
        >
          Adicionar Tarefa
        </button>
      </form>

      <div className="flex flex-col gap-3 max-w-lg">
        {tasks.length === 0 && (
          <p className="text-gray-500">Nenhuma tarefa ainda. Adicione uma acima!</p>
        )}

        {tasks.map(task => (
          <div key={task.id} className="bg-gray-800 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{task.title}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${categoryColor[task.category]} mt-1 inline-block`}>
                {task.category}
              </span>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              className="text-red-400 hover:text-red-300 font-bold text-xl transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskMaster