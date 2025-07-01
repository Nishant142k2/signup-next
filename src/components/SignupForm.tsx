'use client'
import {useState} from 'react';
import { Input } from './ui/input';

export default function SignupForm() {  
    const [formData , setFormData] =useState ({
        name :'',
        email :'',
        password :''
    }) ;

    const [status,setStatus] =useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("Submitting...");

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers :{
                    "content-type" : "application/json" 
                },
            });
            const data =await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            setStatus("User created successfully");
        } catch (err: any) {
            setStatus(`Error: ${err.message}`);
        }
    }
return (
    <form>
        <Input 
        name ="name"
        placeholder='Name'
        required 
        onChange={handleChange}
        className='border p-2 w-full'
        ></Input>
        <Input
         name="email"
         type="email"
         placeholder="Email"
         required
         onChange={handleChange}
         className="border p-2 w-full"></Input>
         <Input
         name="password"
         type="password"
         placeholder="Password"
         required
         onChange={handleChange}
         className="border p-2 w-full">
         </Input>
         <button type='submit' className='bg-blue-500 text-white px-4 py-2'>Sign Up</button>
         <p>{status}</p>
    </form>
)
};
 


