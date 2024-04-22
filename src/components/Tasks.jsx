import React, { useState, useEffect } from 'react'
import { Button, Typography, Popover } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, createTask, createSectionTask } from '../Api/Api'
import { Delete_Task_Success, Fetch_tasks_Success, Create_Task_Success } from '../Store/Features/TodosSlice'
import { useParams } from 'react-router-dom'
import Sections from './Sections/Sections';
import { LoadingOutlined, CalendarOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Form from './Form';
const { Title } = Typography;
import { useSnackbar } from 'notistack';


function Tasks() {

    const { enqueueSnackbar } = useSnackbar();



    const { projectId } = useParams()
    
    const dispatch = useDispatch()
    const [projectid, setprojectid] = useState(projectId)

    const [loading, setLoading] = useState(true);
    const Delete = async (id) => {
        const response = await deleteTask(id);
        dispatch(Delete_Task_Success(id))
    }
    const [selectedSectionId, setSelectedSectionId] = useState(null);

    const handleSectionSelect = (sectionId) => {
        setSelectedSectionId(sectionId);
    };
    const task = useSelector(state => state.todos.tasks)
    useEffect(() => {
        const fetchtask = async () => {
            try {
                const response = await getTasks()
                dispatch(Fetch_tasks_Success(response))
                setLoading(false);
                enqueueSnackbar("Fetched tasks", { variant: 'success' })
            }
            catch (err) {
                enqueueSnackbar('Failed in fetch task: ', err, { variant: 'error' })
            }
        }
        fetchtask()
    }, [])
    useEffect(() => {
        setprojectid(projectId)
    }, [projectId])
 
    const Addtask = async (name, date, string) => {
        // console.log(date,"date");
        // console.log("String",string);
        try {
            const response = await createTask(name, projectId, date, string, todaydate)
            console.log(response, "ADDTASK Function");
            dispatch(Create_Task_Success(response))
        }
        catch (error) {
            console.log(error)
        }
    }
    const AddSectiontask = async (name, date, string) => {
        try {
            const response = await createSectionTask(name, projectId, date, selectedSectionId, string)
            dispatch(Create_Task_Success(response))
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
    // console.log(todaydate, "Date");

    const todaydata = task.filter((element) => element?.due?.date === todaydate)
    // console.log('TodayDAta',todaydata);

    const tasklist = task.filter(task => (!projectId || task.projectId === projectId) && (task.sectionId === null))

    return (
        <>
            {
                projectId ? <Title level={2}>My Projects/</Title> : <Title level={2}>Today</Title>
            }


            <Form title={"Add Task"} handleAdd={Addtask} />

            <center><Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></center>
            {projectId ?
                tasklist.map((data) => (
                    <>

                        <ul key={data.id} style={{ listStyle: 'none' }}>
                            <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', width: 780 }}>
                                <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                                    <span>{data.content}</span>
                                    <span style={{ color: 'grey', fontSize: '15px' }}>
                                        <CalendarOutlined />{data.due?.string}
                                    </span>
                                </div>
                                <Popover
                                    content={
                                        <Button danger onClick={() => Delete(data.id)}>Delete</Button>
                                    }

                                    trigger="click"
                                >
                                    <Button className='listbtn' >{'...'}</Button>
                                </Popover>
                            </li>

                        </ul>
                    </>
                ))
                :
                todaydata.map((data) => (
                    <ul key={data.id} style={{ listStyle: 'none' }}>
                        <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                            <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                                <span>{data.content}</span>
                            </div>
                            <Popover
                                content={
                                    <Button danger onClick={() => Delete(data.id)}>Delete</Button>
                                }
                                trigger="click"
                            >
                                <Button className='listbtn' >{'...'}</Button>
                            </Popover>
                        </li>
                    </ul>
                ))
            }
            {
                projectId && <Sections projectId={projectId} tasks={task} Addtask={AddSectiontask} onSectionSelect={handleSectionSelect} selectedSectionId={selectedSectionId} />
            }

        </>

    )
}

export default Tasks
