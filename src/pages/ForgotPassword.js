import React from 'react'
import CustomInput from '../components/CustomInput'

function ForgotPassword() {
  return (
    <div className='py-5' style={{background:"#001529", minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='text-center'>Forgot Password</h3>
        <p className='text-center'>Please enter your registered email address for get reset token</p>
        <form action=''>
        <CustomInput type='text' label='Email Address' id='email'/>
        <button className='border-0 px-3 py-2 text-white w-100 fw-bold' type='submit' style={{background:"#001529"}}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword