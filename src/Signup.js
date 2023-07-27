import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'

function Signup() {
  const [values, setValues]=useState({
    username:'',
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const[errors,setErrors]=useState({
    
  })
  const handleinput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
  }
  const handlesubmit=(event)=>{
    event.preventDefault();
    const err = Validation(values); 
    setErrors(err);    
         if(err.name === "" && err.email === "" && err.password === "") 
         {           
           axios.post('localhost:8081/signup', values)    
                   .then(res => {    
                            navigate('/');   
                                  })          
      .catch(err => console.log(err));   
         } 
  }
  return (
    <div className='d-flex justify-content-center align-items-center bg-info vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='d-flex justify-content-center align-items-center'>Sign-up</h2>
        <form action=""onSubmit={handlesubmit}>
        <div className='mb-3'>
                <label html for="username"><strong>Username</strong> </label>
                <input type="text" placeholder='Enter Username' name='username'
                onChange={handleinput} className='form-control rounded-0'/>
                {errors.username && <span className='text-danger'>{errors.username}</span>}
            </div>
            <div className='mb-3'>
                <label html for="email"><strong>Email</strong> </label>
                <input type="email" placeholder='Enter Email'  name='email'
                 onChange={handleinput} className='form-control rounded-0'/>
                 {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor='password'><strong>password</strong></label>
                <input type='password' placeholder='Enter password' name='password'
                 onChange={handleinput} className='form-control rounded-0'/>
                 {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Sign up</strong></button>
            <p>You agree to our terms & conditions</p>
            <Link to="/" className='btn-default border w-100 bg-link rounded-0 d-flex justify-content-center align-items-center'>Already have an account? Login here</Link>   
        </form>
      </div>
    </div>
  )
}

export default Signup
