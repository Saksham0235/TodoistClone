import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks } from '../Api/Api'
import { Delete_Task_Success, Fetch_tasks_Success } from '../Store/Features/TodosSlice'
import { useParams } from 'react-router-dom'
import Sections from './Sections/Sections';



function Tasks({sectionid}) {
    const {projectId}=useParams()
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
    useEffect(()=>{
        setprojectid(projectId)
    },[projectId])


    return (
        <>
            {
                // task.filter(data => setprojectid === null || data.projectId === projectid)
                task.filter(task => (!projectId || task.projectId === projectId) && ( task.sectionId === null))
                    .map((data) => {
                        return (
                            <ul key={data.id} style={{ listStyle: 'none' }}>
                                <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>{data.content}  <Button onClick={() => Delete(data.id)} className='listbtn' >Delete</Button></li>
                            </ul>
                        )
                    })
            }
            <Sections projectId={projectId} sectionid={sectionid} tasks={task} />
        </>

    )
}

export default Tasks
