import React from 'react'
import CustomInput from '../components/CustomInput'

function AddColor() {
  return (
    <div>
        <h4 className='mb-4'>Add Color</h4>
        <div>
            <form action=''>
                <CustomInput type='text' label='Enter color name'/>
                <button className='btn btn-success rounded-3 border-0 my-3' type='submit'>
                    Add Color
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddColor