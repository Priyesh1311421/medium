import { SignupInput } from "@tech100x/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Auth = ({type}:{type:'signin'|'signup'}) => {
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        email: '',
        name: '',
        password: '',
    })

async function sendrequest(){
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/${type}`,postInputs)
        const jwt = response.data.jwt;
        const token = `Bearer ${jwt}`;
        localStorage.setItem('token',token);
        navigate('/blogs');
        alert(type==='signin'?'Logged in successfully':'Account created successfully');
    } catch (error) {
        console.log(error) ;
        alert('An error occurred');
    }
}

  return (
    
    <div className="flex justify-center flex-col h-screen">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold ">
                    Create an account
                </div>
                <div className="text-slate-500">
                    {type==="signin"?"Don't have an account?":'Already have an account?'}
                    <a href={type === 'signin'?'/signup':'/signin'} className="pl-2 underline">
                        {type==="signin"?'Sign up':'Login'}
                    </a>
                </div>
                <div className="pt-8">
                    {type==='signup'?<LabelledInput label="Name" placeholder="John Doe" onchange={(e)=>
                        setPostInputs({...postInputs,name:e.target.value})
                    }/>:null}
                    <LabelledInput label="Email" placeholder="johndoe@gmail.com" onchange={(e)=>
                        setPostInputs({...postInputs,email:e.target.value})
                    }/>
                    <LabelledInput label="Password" type="password" placeholder="123456" onchange={(e)=>
                        setPostInputs({...postInputs,password:e.target.value})
                    }/>
                </div>
                <div className="pt-8 flex justify-center">
                    <button onClick={sendrequest} type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
                        {type==='signin'?'Login':'Sign up'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

interface LabelledInputProps {
    label: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label,placeholder,onchange,type}:LabelledInputProps) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 pt-4">{label}</label>
            <input type={type||"text"} onChange={onchange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}

export default Auth