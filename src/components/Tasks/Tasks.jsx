import React, { useState, useEffect } from 'react'
import { Button, Typography, Popover } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, createTask, completeTask, updateTaskapi } from '../../Api/Api'
import { deleteTaskAction, Fetch, Create, Update, checkboxTaskTodo } from '../../Store/Features/TodosSlice'
import { useParams } from 'react-router-dom'
import Sections from '../Sections/Sections';
import { LoadingOutlined, CalendarOutlined, EditOutlined, TagOutlined } from '@ant-design/icons';
import { Spin, Checkbox } from 'antd';
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
    const [seletedTaskId, setSelectedTaskId] = useState(null)
    const [openForm, setOpenForm] = useState(false)


    const toggleform = () => {
        // console.log(isformopen, "State of form");
        setisformopen(() => !isformopen)
        // seteditdata(null)
        // setSelectedTaskId(null)
    }
    const toggleform1 = () => {
        setOpenForm(() => !openForm)
        seteditdata(null)
        setSelectedTaskId(null)
    }
    const Delete = async (id) => {
        const response = await deleteTask(id);
        dispatch(deleteTaskAction(id))
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

    const addTask = async (name, date, string, description, projectId, labels) => {
        console.log(labels, "From Add function");
        console.log(projectId, ' id from add function');
        try {
            const response = await createTask(name, projectId, date, string, todaydate, description, labels)
            dispatch(Create(response))
            // console.log(response, "after create task ");
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleedit = (taskid) => {
        const dataset = task.filter(element => element.id === taskid)
        const data = dataset[0]
        // console.log(data, 'From handleedit');
        seteditdata(data)
        setSelectedTaskId(taskid)
    }

    const updateTaskFunc = async (content, due_date, due_string, description, projectId, labels) => {
        console.log(projectId, 'From update function');
        try {
            const response = await updateTaskapi(editdata.id,
                {
                    content: content,
                    due_date: due_date,
                    due_string: due_string,
                    description: description,
                    projectId: `${projectId}`,
                    labels: labels
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
    const handleChecbox = async (taskId) => {
        try {
            const res = await completeTask(taskId)
            dispatch(checkboxTaskTodo(taskId))
            enqueueSnackbar('Task Completed', { variant: 'success' })
        } catch (error) {
            console.log('Error in checkboxTask', error);
        }
    }



    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const monthname = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate()
    let todaydate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
    // console.log(todaydate, "Date");
    const formatteddate = `${day} ${monthname}`

    // Data containing date set to today's date --------------
    const todaydata = task.filter((element) => element?.due?.date === todaydate && (element.sectionId === null))
    // console.log('TodayDAta', todaydata);

    const tasklist = task.filter(task => (task.projectId === projectId) && (task.sectionId === null))
    // console.log(tasklist, "Task list");

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-40px', marginLeft: '3rem' }}>
            {
                projectId ? <Title level={2} style={{ marginLeft: "25px" }}> {projectName}</Title> : <Title level={3} style={{ marginLeft: "25px" }}>{formatteddate} Today</Title>
            }
            <center><Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></center>
            {
                projectName ?

                    tasklist.map((data) => (
                        <div >
                            {
                                seletedTaskId === data.id ?
                                    (<Form editmode={editdata} UpdateTask={updateTaskFunc} isformopen={openForm} toggleform={toggleform1} handleupdate={updateTaskFunc} />)
                                    :
                                    (
                                        <ul key={data.id} style={{ listStyle: 'none' }}>
                                            <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', width: 770, }}>
                                                <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center' }}><Checkbox
                                                        style={{
                                                            paddingRight: '1rem', marginTop: '-5px'
                                                        }}
                                                        onChange={() => {
                                                            handleChecbox(data.id)
                                                        }}
                                                    ></Checkbox>
                                                        {data.content}</span>

                                                    <span style={{ fontSize: '13px', color: 'gray', marginTop: '3px', marginBottom: '3px', marginLeft: '2rem' }}>
                                                        {data.description}
                                                    </span>
                                                    <span style={{ color: 'green', fontSize: '15px', width: 130, display: 'flex', justifyContent: 'space-between', marginLeft: '2rem' }} >
                                                        <span><CalendarOutlined />{data.due?.string === todaydate ? 'Today' : data.due?.string}</span>
                                                        {data.labels.map((label) => {
                                                            return (<span style={{ fontSize: '14px', color: 'slategrey' }}><TagOutlined style={{ marginRight: 3 }} />{label}</span>)
                                                        })
                                                        }
                                                    </span>
                                                </div>
                                                <div className="buttons" style={{ width: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { handleedit(data.id); setOpenForm(true) }} />
                                                    <Popover
                                                        content={<Button danger onClick={() => Delete(data.id)}>Delete</Button>}
                                                        trigger="click"
                                                    >
                                                        <Button className='listbtn' >{'...'}</Button>
                                                    </Popover>

                                                </div>

                                            </li>

                                        </ul>
                                    )
                            }

                        </div>
                    ))
                    :
                    todaydata.map((data) => (
                        <div>
                            {
                                seletedTaskId === data.id ?
                                    (<Form editmode={editdata} UpdateTask={updateTaskFunc} isformopen={openForm} toggleform={toggleform1} handleupdate={updateTaskFunc} />)
                                    :
                                    (<ul key={data.id} style={{ listStyle: 'none' }}>
                                        <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', width: 750 }}>
                                            <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                                                <span ><Checkbox
                                                    style={{
                                                        paddingRight: '1rem', marginTop: '-5px'
                                                    }}
                                                    onChange={() => {
                                                        handleChecbox(data.id)
                                                    }}
                                                ></Checkbox>
                                                    {data.content}</span>
                                                {
                                                    data.labels.map((label) => (
                                                        <span style={{ fontSize: '14px',marginLeft:'2rem',marginTop:'5px',color:'grey' }}><TagOutlined style={{ marginRight: 3 }} />{label}</span>
                                                    ))
                                                }
                                                <span style={{ fontSize: '13px', color: 'gray', marginLeft: '2rem' }}>{data.description}</span>
                                            </div>
                                            <div className="buttons" style={{ width: 100, display: 'flex', justifyContent: 'space-between' }}>
                                                <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { handleedit(data.id); setOpenForm(true) }} />
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
                                    </ul>)

                            }

                        </div>

                    ))
            }
            <Form title={"Add Task"} handleAdd={addTask} UpdateTask={updateTaskFunc} isformopen={isformopen} toggleform={toggleform} handleupdate={updateTaskFunc} />
            {
                projectId && <Sections projectId={projectId} tasks={task} UpdateTask={updateTaskFunc} />
            }

        </div>

    )
}

export default Tasks
