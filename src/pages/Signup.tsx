

"use client"

import { Input } from "../components/CreateContentModel"
import { Button } from "../components/Button"
import { GoogleIcon } from "../components/icons/GoogleIcon"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import { useRef } from "react"
import { useGoogleLogin } from '@react-oauth/google';


function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  async function handleSignup() {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    try {
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username: username,
        password: password,
      })
      navigate("/signin")
      alert("You have signed up")
    } catch (error) {
      console.error("Signup error:", error)
      alert("Signup failed. Please try again.")
    }
  }


  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        console.log("Google login success:", codeResponse);
        // Make sure code is present in the response
        if (!codeResponse.code) {
          throw new Error("No authorization code received from Google");
        }
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/google-signin`, {
          code: codeResponse.code,
        });
        
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
      } catch (error) {
        console.error("Google login error:", error);
        alert("Google login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      alert("Google login failed. Please try again.");
    },
    flow: 'auth-code',
    // Add the redirect URL - must match what's configured in Google Cloud Console
    redirect_uri: "http://localhost:5173" // Update this to match your actual frontend URL
  });

  return (
    <div className="w-full min-h-screen fixed top-0 left-0 bg-black flex justify-center items-center p-4">
      <div className="w-full max-w-sm rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-800">
        <div className="text-2xl font-bold tracking-tight text-white">OneBrain</div>

        <div className="text-lg mt-4 font-semibold text-center text-white">Create Your Account</div>

        <div className="text-gray-400 mt-2 text-center text-sm">Welcome! Please enter your details</div>

        <div className="w-full mt-6 h-11 bg-black border border-gray-700 flex justify-center items-center text-white rounded-md cursor-pointer hover:bg-gray-800 transition">
          <div className="pr-2">{<GoogleIcon />}</div>
          <div className="text-sm font-medium" onClick={googleLogin}>Sign up with Google</div>
        </div>

        <div className="flex items-center w-full my-4">
          <div className="flex-grow h-px bg-gray-700"></div>
          <div className="mx-2 text-sm text-gray-500">or</div>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        <div className="w-full space-y-4">
          <Input placeholder="Username" reference={usernameRef} />
          <Input placeholder="Password" reference={passwordRef} type="password" />
        </div>

        <div className="mt-6 w-full">
          <Button variant="primary" text="Sign up" onClick={handleSignup} fullWidth={true}></Button>
        </div>

        <div className="mt-4 flex text-sm">
          <div className="text-gray-500">Already have an account?</div>
          <Link to="/signin" className="ml-1 text-white font-medium hover:text-gray-300">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
