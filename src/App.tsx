
import {Routes,Route} from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard.tsx";
import { Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ActiveContentProvider } from './pages/contexts/activeContentContext.tsx';


function App() {

  type PrivateRouteProps = {
    children: React.ReactNode;
  };

  // const PrivateRoute = ({ children }:PrivateRouteProps) => {
  //   const token = localStorage.getItem("token");
  //   return token ? <Navigate to="/dashboard" /> : children;
  // };


  // PrivateRoute: Protects routes that require authentication
  const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem('token');
    // If the user is not authenticated, redirect to /signin
    return token ? <>{children}</> : <Navigate to="/signin" />;
  };

  return(
    <div>
      <GoogleOAuthProvider clientId="661825278445-ob1q03ef5k4km1qg98civdqhftopsrk5.apps.googleusercontent.com">
        <ActiveContentProvider>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/signup' element={<Signup/>} />
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
