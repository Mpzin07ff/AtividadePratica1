import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6 items-center shadow-lg">
      <span className="font-bold text-xl text-purple-400"> Ferramentas Utilitárias</span>

      <Link to="/" className="text-white-400">Home</Link>
      <Link to="/taskmaster" className="text-white-400">TaskMaster</Link>
      <Link to="/connecthub" className="text-white-400">ConnectHub</Link>
      <Link to="/moneyflow" className="text-white-400">MoneyFlow</Link>
    </nav>
  )
}

export default Navbar