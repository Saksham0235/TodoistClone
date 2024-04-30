import React, { useState, useEffect } from 'react'
import { Button, Typography, Popover } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, createTask, completeTask, updateTaskapi, unCompleteTask } from '../../Api/Api'
import { deleteTaskAction, Fetch, Create, Update, checkboxTaskTodo, unCheckTask } from '../../Store/Features/TodosSlice'
import { useParams } from 'react-router-dom'
import Sections from '../Sections/Sections';
import { LoadingOutlined, CalendarOutlined, EditOutlined, TagOutlined } from '@ant-design/icons';
import { Spin, Checkbox } from 'antd';
import Form from './Form'
const { Title } = Typography;
import { useSnackbar } from 'notistack';
import './task.css'
import Taskdata from './TodayTask';

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
    const [completed, setCompleted] = useState(false)
    const task = useSelector(state => state.todos.tasks)
    const activeTasks = task.filter(task => !task.isCompleted);


    const toggleform = () => {
        setisformopen(() => !isformopen)
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
    const handleUncheckTask = async (taskid) => {
        console.log(taskid, "Uncheck");
        setCompleted(false)
        try {
            const response = await unCompleteTask(taskid)
            dispatch(unCheckTask(taskid))
            console.log('Before updating from uncheck', completed);
            console.log(response, "From uncomplete function");
            console.log(completed, "State of complete in Uncheckbox");
        }
        catch (err) {
            console.log('Error in uncheckTask', err);
        }
    }
    const handleChecbox = async (taskId) => {
        setCompleted(true)
        try {
            const res = await completeTask(taskId)
            console.log("Before updating", completed);
            dispatch(checkboxTaskTodo(taskId))
            console.log(completed, "State of complete in checkbox");
            enqueueSnackbar(<div  style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:200}}><span style={{fontSize:'15px',fontWeight:550}}>1 task completed </span><button className='alertbtn' onClick={() => handleUncheckTask(taskId)}>Undo</button></div> ,{variant:'info'})
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
    const todaydata = activeTasks.filter((element) => element?.due?.date === todaydate)
    // console.log('TodayDAta', todaydata);

    const tasklist = activeTasks.filter(task => (task?.projectId === projectId) && (task?.sectionId === null))
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
                                    (<Taskdata data={data} title={'taskdata'} Delete={Delete} handleedit={handleedit} todaydate={todaydate} handleChecbox={handleChecbox} setOpenForm={setOpenForm} />)
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
                                    (<Taskdata data={data} title={'todaydata'} Delete={Delete} handleedit={handleedit} todaydate={todaydate} handleChecbox={handleChecbox} setOpenForm={setOpenForm} />)
                            }
                        </div>
                    ))
            }
            <Form title={"Add Task"} handleAdd={addTask} UpdateTask={updateTaskFunc} isformopen={isformopen} toggleform={toggleform} handleupdate={updateTaskFunc} />
            {
                projectId && <Sections projectId={projectId} tasks={task} UpdateTask={updateTaskFunc} handleedit={handleedit} />
            }
        </div >
    )
}

export default Tasks
