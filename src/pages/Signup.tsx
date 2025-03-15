// import { Input } from "../components/CreateContentModel"
// import { Button } from "../components/Button"
// import { GoogleIcon } from "../components/icons/GoogleIcon"
// import { Link, useNavigate } from "react-router-dom"
// import { BACKEND_URL } from '../../config';
// import axios from "axios";
// import { useRef } from "react";

// function Signup(){

//     const usernameRef = useRef<HTMLInputElement>(null)
//     const passwordRef = useRef<HTMLInputElement>(null)
//     const navigate = useNavigate()

//     async function handleSignup(){
//         const username = usernameRef.current?.value
//         const password = passwordRef.current?.value
//         console.log(usernameRef.current?.value)
//         console.log(passwordRef.current?.value)

//         await axios.post( BACKEND_URL  + "/api/v1/signup",{
//                 "username":username,
//                 "password":password
//         })
//         navigate("/signin")
//         alert("you have signed up")
//     }



//     return(
//         <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 flex justify-center items-center">
//             <div className="w-72 h-96 bg-white rounded flex flex-col items-center ">

//                 <div className="text-3xl font-bold">
//                     OneBrain
//                 </div>

//                 <div className="text-2xl mt-1.5 font-semibold">
//                     Create Your Account
//                 </div> 

//                 <div className="text-gray-400 mt-1">
//                     Welcome! Please enter your detals
//                 </div>

//                 <div className=" w-52 mt-4 h-9 bg-slate-100 flex justify-center items-center text-gray-700 border-0 rounded cursor-pointer">
//                    <div className="pr-3">
//                     {<GoogleIcon/>}
//                    </div>

//                    <div>
//                    Sign up with Google
//                    </div>
//                 </div>

//                 <div className="mt-4">
//                 <Input placeholder="username" reference={usernameRef}/>
//                 <Input placeholder="password" reference={passwordRef}/>
//                 </div>
               

//                 <div className="mt-4">
//                 <Button variant="secondary" text="Sign up" onClick={handleSignup}></Button>
//                 </div>
               
//                 <div className="mt-3 flex">
//                     <div className="text-gray-400">Already have an account?</div> 
//                     <div className="ml-1 cursor-pointer"><Link to="/signin">Sign in</Link></div>
//                 </div>


//             </div>
            
//         </div>
//     )
// }

// export default Signup




import { Input } from "../components/CreateContentModel"
import { Button } from "../components/Button"
import { GoogleIcon } from "../components/icons/GoogleIcon"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from '../../config';
import axios from "axios";
import { useRef } from "react";

function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    async function handleSignup(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        try {
            await axios.post(BACKEND_URL + "/api/v1/signup",{
                "username": username,
                "password": password
            })
            navigate("/signin")
            alert("you have signed up")
        } catch (error) {
            console.error("Signup error:", error)
            alert("Signup failed. Please try again.")
        }
    }

    return(
        <div className="w-full h-screen fixed top-0 left-0 bg-slate-500 flex justify-center items-center p-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="text-3xl font-bold">
                    OneBrain
                </div>

                <div className="text-xl sm:text-2xl mt-2 font-semibold text-center">
                    Create Your Account
                </div> 

                <div className="text-gray-400 mt-1 text-center text-sm sm:text-base">
                    Welcome! Please enter your details
                </div>

                <div className="w-full max-w-xs mt-4 h-10 bg-slate-100 flex justify-center items-center text-gray-700 border-0 rounded cursor-pointer hover:bg-slate-200 transition-colors">
                   <div className="pr-2">
                    {<GoogleIcon/>}
                   </div>

                   <div className="text-sm sm:text-base">
                    Sign up with Google
                   </div>
                </div>

                <div className="mt-4 w-full max-w-xs">
                    <Input placeholder="username" reference={usernameRef}/>
                    <Input placeholder="password" reference={passwordRef}/>
                </div>
               
                <div className="mt-4 w-full max-w-xs">
                    <Button variant="secondary" text="Sign up" onClick={handleSignup}></Button>
                </div>
               
                <div className="mt-4 flex text-sm sm:text-base">
                    <div className="text-gray-400">Already have an account?</div> 
                    <div className="ml-1 cursor-pointer text-purple-500 hover:text-purple-700">
                        <Link to="/signin">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup