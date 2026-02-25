import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { financeSchema } from '../schemas/financeSchema'
import { useState, useEffect } from 'react'
import { z } from 'zod'

type FinanceForm = z.infer<typeof financeSchema>

interface Transaction {
  id: number
  description: string
  value: number 
}

function MoneyFlow() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FinanceForm>({
    resolver: zodResolver(financeSchema)
  })


  const total = transactions.reduce((acc, t) => acc + t.value, 0)

  const onSubmit = (data: FinanceForm) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      description: data.description,
      value: data.value,
    }
    setTransactions([...transactions, newTransaction])
    reset()
  }

  const removeTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-400 mb-4"> MoneyFlow</h1>

      <div className={`rounded-2xl p-6 mb-8 max-w-lg text-center ${total >= 0 ? 'bg-purple-900' : 'bg-red-900'}`}>
        <p className="text-gray-300 text-sm">Saldo Total</p>
        <p className="text-4xl font-bold mt-1">
          R$ {total.toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 rounded-2xl p-6 mb-8 flex flex-col gap-4 max-w-lg">

        <div>
          <input
            {...register('description')}
            placeholder="Descrição (Ex: Salário, Aluguel, Dividas)"
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none"
          />
          {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <input
            {...register('value', { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="Valor (Pode ser negativo Ex: -50)"
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none"
          />
          {errors.value && <p className="text-red-400 text-sm mt-1">{errors.value.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-purple-600 rounded-lg px-6 py-2 font-bold transition-colors"
        >
          Registrar
        </button>
      </form>

      <div className="flex flex-col gap-3 max-w-lg">
        {transactions.length === 0 && (
          <p className="text-gray-500">Nenhum registro ainda</p>
        )}

        {transactions.map(t => (
          <div key={t.id} className="bg-gray-800 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{t.description}</p>
              <p className={`text-sm font-bold ${t.value >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
                {t.value >= 0 ? '+' : ''}R$ {t.value.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeTransaction(t.id)}
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

export default MoneyFlow