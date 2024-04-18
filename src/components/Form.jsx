import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {useDispatch} from 'react-redux'
import {Create_Task_Success}  from  '../Store/Features/TodosSlice'
import {createTask} from '../Api/Api'
const Form = ({projectid,sectionid}) => {

  const [open, setOpen] = useState(false);
  const [input,setinput]=useState('')
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const dispatch=useDispatch()

  const handleinput=(e)=>{
    console.log(e.target.value);
    setinput(e.target.value)
  }
  const AddTask=async(e)=>{
    console.log('Clicked');
    e.preventDefault()
    try{
      const response=await createTask({
        content:input,
        projectId:projectid,
      })
      dispatch(Create_Task_Success(response))
      setinput('')
      console.log(input);
      hide()
    }
    catch(err)
    {
      console.log("Error creating task",err);
    }
  }
  return (
    <Popover
      content={
        <form onSubmit={AddTask}>
          <input type='text' value={input} onChange={handleinput} />
          <Button htmlType='submit' onClick={hide}>Add</Button>
        </form>
      }
      title="Title"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      >
      <Button style={{width:150,height:50}} ><PlusOutlined />Add Task</Button>
    </Popover>
  );
};
export default Form;