import React, { useState, useEffect } from 'react'
import { Button, Typography, Popover } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, createTask, createSectionTask, updateTask } from '../../Api/Api'
import { DeleteTask, Fetch, Create, Update } from '../../Store/Features/TodosSlice'
import { useParams } from 'react-router-dom'
import Sections from '../Sections/Sections';
import { LoadingOutlined, CalendarOutlined, EditOutlined, TagOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Form from './Form'
const { Title } = Typography;
import { useSnackbar } from 'notistack';
import './task.css'

function Tasks() {

    const { enqueueSnackbar } = useSnackbar();
    const params = useParams()
    const prop = params.projectId
    let [projectId, projectName] = prop ? prop.split('-') : ''
    const dispatch = useDispatch()
    const [projectid, setprojectid] = useState(projectId)
    const [editdata, seteditdata] = useState(null)
    const [loading, setLoading] = useState(true);
    const [isformopen, setisformopen] = useState(false)


    const toggleform = () => {
        console.log(isformopen, "State of form");
        setisformopen(() => !isformopen)
        seteditdata(null)
    }
    const Delete = async (id) => {
        const response = await deleteTask(id);
        dispatch(DeleteTask(id))
    }
    const task = useSelector(state => state.todos.tasks)
    // console.log(task, "from tasks");

    useEffect(() => {
        const fetchtask = async () => {
            try {
                const response = await getTasks()
                dispatch(Fetch(response))
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

    const Addtask = async (name, date, string, description, projectId) => {
        try {
            const response = await createTask(name, projectId, date, string, todaydate, description)
            dispatch(Create(response))
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

    const UpdateTask = async (content, due_date, due_string, description, projectId) => {
        console.log(due_date, "From update function");
        // console.log(dueString,"From update function");
        console.log(projectId, 'From update function');
        try {
            const response = await updateTask(editdata.id,
                {
                    projectId: projectId,
                    content: content,
                    due_date: due_date,
                    due_string: due_string,
                    description: description
                })
            console.log(response, "From updatefun");
            dispatch(Update(response))
            setisformopen(false)
            // seteditdata(null)
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

    // Data containing date set to today's date --------------
    const todaydata = task.filter((element) => element?.due?.date === todaydate && (element.sectionId === null))
    // console.log('TodayDAta', todaydata);

    const tasklist = task.filter(task => (task.projectId === projectId) && (task.sectionId === null))
    // console.log(tasklist, "Task list");

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                projectId ? <Title level={2} style={{ marginLeft: "25px" }}> {projectName}</Title> : <Title level={2} style={{ marginLeft: "25px" }}>Today</Title>
            }
            <center><Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></center>
            {
                projectName ?

                    tasklist.map((data) => (
                        <div >
                            <ul key={data.id} style={{ listStyle: 'none' }}>
                                <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', width: 770, }}>
                                    <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                                        <span>{data.content}</span>

                                        <span style={{ fontSize: '10px', color: 'gray' }}>
                                            {data.description}
                                        </span>
                                        <span style={{ color: 'green', fontSize: '15px',border:'1px solid red',width:150,display:'flex',justifyContent:'space-between' }} >
                                           <span><CalendarOutlined />{data.due?.string === todaydate ? 'Today' : data.due?.string}</span> 
                                            {
                                                data.labels.map((label) => {
                                                    return (
                                                        <span style={{ fontSize: '14px', color: 'slategrey' }}><TagOutlined style={{ marginRight: 3 }} />{label}</span>
                                                    )
                                                }
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className="buttons" style={{ width: 100, display: 'flex', justifyContent: 'space-between' }}>
                                        <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { handleedit(data.id); setisformopen(true) }} />
                                        <Popover
                                            content={<Button danger onClick={() => Delete(data.id)}>Delete</Button>}
                                            trigger="click"
                                        >
                                            <Button className='listbtn' >{'...'}</Button>
                                        </Popover>

                                    </div>

                                </li>

                            </ul>
                        </div>
                    ))
                    :
                    todaydata.map((data) => (
                        <ul key={data.id} style={{ listStyle: 'none' }}>
                            <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', width: 750 }}>
                                <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                                    <span>{data.content}</span>
                                    {
                                        data.labels.map((label) => (
                                            <span style={{ fontSize: '14px' }}><TagOutlined style={{ marginRight: 3 }} />{label}</span>
                                        ))
                                    }
                                    <span style={{ fontSize: '13px', color: 'gray' }}>{data.description}</span>
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
                    ))
            }
            <Form title={"Add Task"} handleAdd={Addtask} editmode={editdata} UpdateTask={UpdateTask} isformopen={isformopen} projectId={projectId} projectName={projectName} toggleform={toggleform} handleupdate={UpdateTask} />
            {
                projectId && <Sections projectId={projectId} tasks={task} UpdateTask={UpdateTask} />
            }

        </div>

    )
}

export default Tasks
