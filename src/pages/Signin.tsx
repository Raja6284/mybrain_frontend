
import { Input } from "../components/CreateContentModel"
import { Button } from "../components/Button"
import { GoogleIcon } from "../components/icons/GoogleIcon"
import { Link } from "react-router-dom"
import { BACKEND_URL } from "../../config"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import axios from "axios"

function Signin(){

    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    async function handleSignin(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        console.log(usernameRef.current?.value)
        console.log(passwordRef.current?.value)

        const response = await axios.post( BACKEND_URL  + "/api/v1/signin",{
                "username":username,
                "password":password
        })

        console.log(response)

        const jwt = response.data.token
        localStorage.setItem("token",jwt)
        navigate("/dashboard")
        
    }


    return(
        <div className="w-screen h-screen fixed top-0 left-0 bg-slate-600 flex justify-center items-center">
            <div className="w-72 h-96 bg-white rounded flex flex-col items-center">

            <div className="text-3xl font-bold">
                    OneBrain
                </div>

                <div className="text-2xl mt-1.5 font-semibold">
                    Hi there!
                </div> 

                <div className="text-gray-400 mt-1">
                    Welcome! Your brain is here
                </div>

                <div className=" w-52 mt-4 h-9 bg-slate-100 flex justify-center items-center text-gray-700 border-0 rounded cursor-pointer">
                   <div className="pr-3">
                    {<GoogleIcon/>}
                   </div>

                   <div>
                   Sign in with Google
                   </div>
                </div>

                <div className="mt-4">
                <Input placeholder="username" reference={usernameRef}/>
                <Input placeholder="password" reference={passwordRef}/>
                </div>
               

                <div className="mt-4">
                <Button variant="secondary" text="Sign in" onClick={handleSignin}></Button>
                </div>
               
                <div className="mt-3 flex">
                    <div className="text-gray-400">Don't have an account?</div> 
                    <div className="ml-1 cursor-pointer"><Link to="/">Sign up</Link></div>
                </div>

                
            </div>
            
        </div>
    )
}

export default Signin