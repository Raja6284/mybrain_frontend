import {Routes,Route} from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard";

function App() {
  return(
    <div>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App
