import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-10 p-8">
      <h1 className="text-4xl font-bold text-white-400">Seje bem-vindo ao nosso Hub de {""} 
        <span className="text-purple-400">
          Ferramentas Utilitárias
        </span> !
      </h1>
      <p className="text-gray-400 text-lg">Selecione uma ferramenta para começar:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">

        <div
          onClick={() => navigate('/taskmaster')}
          className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 cursor-pointer hover:bg-purple-900 hover:scale-105 transition-all shadow-xl"
        >
          <h2 className="text-2xl font-bold"> - TaskMaster</h2>
          <p className="text-gray-400 text-center">Gerencie suas tarefas do dia a dia</p>
        </div>

        <div
          onClick={() => navigate('/connecthub')}
          className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 cursor-pointer hover:bg-purple-900 hover:scale-105 transition-all shadow-xl"
        >
          <h2 className="text-2xl font-bold"> - ConnectHub</h2>
          <p className="text-gray-400 text-center">Cadastre e organize seus contatos</p>
        </div>

        <div
          onClick={() => navigate('/moneyflow')}
          className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 cursor-pointer hover:bg-purple-900 hover:scale-105 transition-all shadow-xl"
        >
          <h2 className="text-2xl font-bold"> - MoneyFlow</h2>
          <p className="text-gray-400 text-center">Controle suas entradas e saídas financeiras</p>
        </div>

      </div>
    </div>
  )
}

export default Home