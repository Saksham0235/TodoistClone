import React, { useState, useEffect } from 'react'
import { Button, Typography, Popover } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, createTask, createSectionTask, updateTask } from '../Api/Api'
import { Delete_Task_Success, Fetch_tasks_Success, Create_Task_Success, Update_Task_Success } from '../Store/Features/TodosSlice'
import { useParams } from 'react-router-dom'
import Sections from './Sections/Sections';
import { LoadingOutlined, CalendarOutlined, EditOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Form from './Form';
const { Title } = Typography;
import { useSnackbar } from 'notistack';


function Tasks() {

    const { enqueueSnackbar } = useSnackbar();

    const params = useParams()
    const prop=params.projectId
    

    let [projectId, projectName] = prop ? prop.split('-') : ''


    const dispatch = useDispatch()
    const [projectid, setprojectid] = useState(projectId)
    const [editdata, seteditdata] = useState(null)
    const [loading, setLoading] = useState(true);
    const [isformopen, setisformopen] = useState(false)

    const toggleform = () => {
        console.log(isformopen, "State of form");
        setisformopen(!isformopen)
    }
    const Delete = async (id) => {
        const response = await deleteTask(id);
        dispatch(Delete_Task_Success(id))
    }
    const [selectedSectionId, setSelectedSectionId] = useState(null);

    const handleSectionSelect = (sectionId) => {
        setSelectedSectionId(sectionId);
    };
    const task = useSelector(state => state.todos.tasks)
    const projects = useSelector(state => state.projects.Projects)
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
        try {
            const response = await createTask(name, projectId, date, string, todaydate)
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

    const handleedit = (taskid) => {
        const dataset = task.filter(element => element.id === taskid)
        const data = dataset[0]
        console.log(data, 'From handleedit');
        seteditdata(data)

    }

    const UpdateTask = async (content, date, string) => {
        try {
            const response = await updateTask(editdata?.id,
                {
                    content: content,
                    due_date: date,
                    due_string: string
                })
            console.log(response, "From updatefun");
            dispatch(Update_Task_Success(response))
            setisformopen(false)
            seteditdata(null)
        }
        catch (error) {
            console.log('Error updating task', error);
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
                projectId ? <Title level={2}> {projectName}</Title> : <Title level={2}>Today</Title>
            }


            <Form title={"Add Task"} handleAdd={Addtask} editmode={editdata} UpdateTask={UpdateTask} isformopen={isformopen} toggleform={toggleform} handleupdate={UpdateTask} />

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
                                <div className="buttons" style={{ width: 100, display: 'flex', justifyContent: 'space-between' }}>
                                    <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { handleedit(data.id); setisformopen(true) }} />
                                    <Popover
                                        content={
                                            <Button danger onClick={() => Delete(data.id)}>Delete</Button>
                                        }

                                        trigger="click"
                                    >
                                        <Button className='listbtn' >{'...'}</Button>
                                    </Popover>

                                </div>

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
                projectId && <Sections projectId={projectId} tasks={task} Addtask={AddSectiontask} onSectionSelect={handleSectionSelect} selectedSectionId={selectedSectionId} UpdateTask={UpdateTask} />
            }

        </>

    )
}

export default Tasks
