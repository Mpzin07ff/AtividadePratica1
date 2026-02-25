import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '../schemas/contactSchema'
import { useState, useEffect } from 'react'
import { z } from 'zod'

type ContactForm = z.infer<typeof contactSchema>

interface Contact {
  id: number
  name: string
  email: string
  phone: string
}

function ConnectHub() {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('contacts')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = (data: ContactForm) => {
    const newContact: Contact = { id: Date.now(), ...data }
    setContacts([...contacts, newContact])
    reset()
  }

  const removeContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-pruple-400 mb-8"> ConnectHub</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 rounded-2xl p-6 mb-8 flex flex-col gap-4 max-w-lg">

        <div>
          <input
            {...register('name')}
            placeholder="Nome Completo"
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register('email')}
            placeholder="E-mail"
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register('phone')}
            placeholder="Telefone (só números)"
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-pruple-700 rounded-lg px-6 py-2 font-bold transition-colors"
        >
          Cadastrar Contato
        </button>
      </form>

      <div className="flex flex-col gap-3 max-w-lg">
        {contacts.length === 0 && (
          <p className="text-gray-500">Nenhum contato ainda. Cadastre um acima!</p>
        )}

        {contacts.map(contact => (
          <div key={contact.id} className="bg-gray-800 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{contact.name}</p>
              <p className="text-gray-400 text-sm">{contact.email}</p>
              <p className="text-gray-400 text-sm">{contact.phone}</p>
            </div>
            <button
              onClick={() => removeContact(contact.id)}
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

export default ConnectHub