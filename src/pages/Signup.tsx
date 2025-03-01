import { Input } from "../components/CreateContentModel"
import { Button } from "../components/Button"
import { GoogleIcon } from "../components/icons/GoogleIcon"
import { Link } from "react-router-dom"

function Signup(){
    return(
        <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 flex justify-center items-center">
            <div className="w-72 h-96 bg-white rounded flex flex-col items-center ">

                <div className="text-3xl font-bold">
                    OneBrain
                </div>

                <div className="text-2xl mt-1.5 font-semibold">
                    Create Your Account
                </div> 

                <div className="text-gray-400 mt-1">
                    Welcome! Please enter your detals
                </div>

                <div className=" w-52 mt-4 h-9 bg-slate-100 flex justify-center items-center text-gray-700 border-0 rounded cursor-pointer">
                   <div className="pr-3">
                    {<GoogleIcon/>}
                   </div>

                   <div>
                   Sign up with Google
                   </div>
                </div>

                <div className="mt-4">
                <Input placeholder={"email(username)"}/>
                <Input placeholder={"password"}/>
                </div>
               

                <div className="mt-4">
                <Button variant="secondary" text="Sign up"></Button>
                </div>
               
                <div className="mt-3 flex">
                    <div className="text-gray-400">Already have an account?</div> 
                    <div className="ml-1 cursor-pointer"><Link to="/signin">Sign in</Link></div>
                </div>


            </div>
            
        </div>
    )
}

export default Signup