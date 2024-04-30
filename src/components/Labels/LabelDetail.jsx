import React, { useState } from 'react'
import Form from '../Tasks/Form'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CalendarOutlined, TagOutlined } from '@ant-design/icons'
import { Popover, Button } from 'antd'
import { Create } from '../../Store/Features/TodosSlice'
import { deleteTask, createTask } from '../../Api/Api'



function LabelDetail() {
  const [isformopen, setisformopen] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()
  const prop = params.labelid
  // console.log(prop,"from params");
  let [labelname, labelid] = prop ? prop.split('-') : ''
  // console.log(params,'From params');

  const tasks = useSelector((state) => state.todos.tasks)
  // console.log(tasks,'From Label');
  const taskdata = tasks.filter((task) => task.labels[0] === labelname)
  console.log(taskdata, "From labels");
  const Delete = async (id) => {
    const response = await deleteTask(id);
    dispatch(deleteTaskAction(id))
  }
  const toggleform = () => {
    // console.log(isformopen, "State of form");
    setisformopen(() => !isformopen)

  }
  const addTask = async (name, date, string, description, projectId) => {
    const labels = labelname ? [labelname] : []
    try {
      const response = await createTask(name, projectId, date, string, todaydate, description, labels)
      dispatch(Create(response))
    }
    catch (error) {
      console.log(error)
    }
  }


  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  let todaydate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`

  return (
    <div>
      <h1>{labelname}</h1>
      {
        taskdata.map((data) => (
          <ul key={data.id} style={{ listStyle: 'none' }}>
            <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', width: 770, marginLeft: '-30px' }}>
              <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                <span>{data.content}</span>
                <span style={{ fontSize: '10px', color: 'gray' }}>{data.description}</span>
                <span style={{ color: 'grey', fontSize: '15px', }} >
                  <CalendarOutlined />{data.due?.string}
                  {data.labels.map((label) => {
                    return (
                      <span style={{ fontSize: '14px', color: 'slategrey' }}><TagOutlined style={{ marginLeft: 15, marginRight: 3 }} />{label}</span>
                    )
                  })
                  }
                </span>
              </div>
              <div className="buttons" style={{ width: 100, display: 'flex', justifyContent: 'space-between' }}>
                {/* <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { handleedit(data.id); setisformopen(true) }} /> */}
                <Popover trigger="click"
                  content={<Button danger onClick={() => Delete(data.id)}>Delete</Button>}
                >
                  <Button className='listbtn' >{'...'}</Button>
                </Popover>
              </div>
            </li>
          </ul>
        ))
      }
      <Form title={"Add Task"} handleAdd={addTask} isformopen={isformopen} toggleform={toggleform} />
    </div>
  )
}

export default LabelDetail
