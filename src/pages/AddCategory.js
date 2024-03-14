import React from 'react'
import CustomInput from '../components/CustomInput'

function AddCategory() {
  return (
    <div>
        <h4 className='mb-4'>Add Category</h4>
        <div>
            <form action=''>
                <CustomInput type='text' label='Enter Category'/>
                <button className='btn btn-success rounded-3 border-0 my-3' type='submit'>
                Add Category
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory