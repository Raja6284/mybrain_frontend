

import {Routes,Route} from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard.tsx";
import { Navigate } from 'react-router-dom';

function App() {

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/dashboard" /> : children;
  };

  return(
    <div>
      <Routes>
        <Route path='/' element={<Signup/>} />
        {/* <Route path='/signin' element={<Signin/>} /> */}
        <Route path="/signin" element={<PrivateRoute><Signin /></PrivateRoute>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App
