import React, { useState } from 'react'
import { useDispatch } from 'react-redux'


function FormProject() {
    const dispatch=useDispatch()
    const[input,setinput]=useState('')

    const AddProject=async(name)=>{
        const response=await createProject({
            name:input
        })
    }
  return (
    <div>
      
    </div>
  )
}

export default FormProject
