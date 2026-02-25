import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TaskMaster from './pages/TaskMaster'
import ConnectHub from './pages/ConnectHub'
import MoneyFlow from './pages/MoneyFlow'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/taskmaster" element={<TaskMaster />} />
        <Route path="/connecthub" element={<ConnectHub />} />
        <Route path="/moneyflow" element={<MoneyFlow />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App