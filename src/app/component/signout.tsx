
import {signOut } from "next-auth/react"
export default function SignOutComponent(){
    const handlelogOut=async()=>{
        await signOut({callbackUrl:'/auth/login'})
    }
    return(
        <button
            onClick={()=>handlelogOut()}
            className="bg-red-600 hover:bg-red-700 text-white 
                        font-medium py-1 px-4 rounded-lg shadow-md 
                        transition duration-200 cursor-pointer">
                    Log out
        </button>

)}