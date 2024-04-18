import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, createTask } from '../Api/Api'
import { Delete_Task_Success, Fetch_tasks_Success, Create_Task_Success } from '../Store/Features/TodosSlice'
import { useParams } from 'react-router-dom'
import Sections from './Sections/Sections';
import Form from './Form';



function Tasks({ sectionid }) {
    const { projectId } = useParams()
    const dispatch = useDispatch()
    const [projectid, setprojectid] = useState(projectId)
    const Delete = async (id) => {
        const response = await deleteTask(id);
        dispatch(Delete_Task_Success(response))
    }
    const task = useSelector(state => state.todos.tasks)
    useEffect(() => {
        const fetchtask = async () => {
            const response = await getTasks()
            dispatch(Fetch_tasks_Success(response))
        }
        fetchtask()
    }, [])
    useEffect(() => {
        setprojectid(projectId)
    }, [projectId])

    const Addtask = async (name) => {
        try{
            const response = await createTask(name, projectId, todaydate)
            dispatch(Create_Task_Success(response))
        }
        catch(error){
            console.log(error)
        }
    }

    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    let todaydate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day }`

    const todaydata=task.filter((element)=>element?.due?.date===todaydate)
    // console.log('TodayDAta',todaydata);

    const tasklist= task.filter(task => (!projectId || task.projectId === projectId) && (task.sectionId === null))

    return (
        <>
            <Form title={"Add Task"} handleAdd={Addtask} />
         
            {projectId?
                tasklist.map((data) => (
                    <ul key={data.id} style={{ listStyle: 'none' }}>
                        <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                            {data.content}
                            <Button onClick={() => Delete(data.id)} className='listbtn' >Delete</Button>
                        </li>
                    </ul>
                ))
                :
                todaydata.map((data) => (
                    <ul key={data.id} style={{ listStyle: 'none' }}>
                        <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                            {data.content}
                            <Button onClick={() => Delete(data.id)} className='listbtn' >Delete</Button>
                        </li>
                    </ul>
                ))
            }
            <Sections projectId={projectId} sectionid={sectionid} tasks={task} />
        </>

    )
}

export default Tasks
