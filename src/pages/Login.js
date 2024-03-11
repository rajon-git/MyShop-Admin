import React from 'react'
import CustomInput from '../components/CustomInput'

function Login() {
  return (
    <div className='py-5' style={{background:"#ffd333", minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
      <br/>
     
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='text-center'>Login</h3>
        <p className='text-center'>Login to your account to continue</p>
        <form action=''>
        <CustomInput type='text' label='Email Address' id='email'/>
        <CustomInput type='password' label='Password' id='pass'/>
        <button className='border-0 px-3 py-2 text-white w-100 fw-bold' type='submit' style={{background:"#ffd333"}}>login</button>
        </form>
      </div>
    </div>
  )
}

export default Login