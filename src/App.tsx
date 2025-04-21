
import {Routes,Route} from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard.tsx";
import { Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ActiveContentProvider } from './pages/contexts/activeContentContext.tsx';
import { GOOGLE_CLIENT_ID } from '../config.ts';

function App() {

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/dashboard" /> : children;
  };

  return(
    <div>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ActiveContentProvider>
      <Routes>
        <Route path='/' element={<Signup/>} />
        {/* <Route path='/signin' element={<Signin/>} /> */}
        <Route path="/signin" element={<PrivateRoute><Signin /></PrivateRoute>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
      </ActiveContentProvider>
         </GoogleOAuthProvider>
      
    </div>
  )
}

export default App
