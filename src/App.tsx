import {Routes,Route} from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard.tsx";
import { Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ActiveContentProvider } from './pages/contexts/activeContentContext.tsx';
import LandingPage from './pages/Home.tsx'

function App() {

  type PrivateRouteProps = {
    children: React.ReactNode;
  };

  // PrivateRoute: Protects routes that require authentication
  // Redirects to signin if user isn't logged in
  const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem('token');
    return token ? <>{children}</> : <Navigate to="/signin" />;
  };

  // AuthRoute: Protects authentication routes (signin/signup)
  // Redirects to dashboard if user is already logged in
  // This prevents logged-in users from accessing signin/signup pages even if they try to navigate there directly
  const AuthRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem('token');
    // If token exists, user is logged in, so redirect to dashboard
    return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
  };

  return(
    <div>
      <GoogleOAuthProvider clientId="661825278445-ob1q03ef5k4km1qg98civdqhftopsrk5.apps.googleusercontent.com">
        <ActiveContentProvider>
          <Routes>
            <Route path='/' element={<AuthRoute><LandingPage /></AuthRoute>} />
            <Route path='/signup' element={<AuthRoute><Signup /></AuthRoute>} />
            <Route path='/signin' element={<AuthRoute><Signin /></AuthRoute>} />
            <Route path='/home' element={<AuthRoute><LandingPage /></AuthRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        </ActiveContentProvider>
      </GoogleOAuthProvider>
    </div>
  )
}

export default App