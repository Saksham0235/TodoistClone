import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../Api/Api'
import { Delete_Task_Success } from '../../Store/Features/TodosSlice'
import { Button, Popover } from 'antd';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import Form from '../Form';
function SectionTasks({ sectionid, projectId, tasks,Addtask }) {
    // console.log('From SectionTasks',tasks);
    const [isformopen, setisformopen] = useState(false)


    const toggleform = () => {
        setisformopen(!isformopen)
    }

    const dispatch = useDispatch()
    const Delete = async (id) => {
        const response = await deleteTask(id);
        dispatch(Delete_Task_Success(id))
    }

  
    return (
        <div>
            {

                tasks.filter(task => (!projectId || task.projectId === projectId) && (!sectionid || task.sectionId === sectionid))
                    .map((data) => {
                        return (
                            <ul key={data.id} style={{ listStyle: 'none' }}>
                                <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                                        <span>{data.content}</span>
                                        <span style={{ color: 'grey', fontSize: '15px' }}>
                                            <CalendarOutlined />{data.due?.string}
                                        </span>
                                    </div>
                                    <div className="buttons" style={{ width: 100, display: 'flex', justifyContent: 'space-between ' }}>
                                        {/* <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { handleedit(data.id); setisformopen(true) }} /> */}
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
                        )
                    })
            }
            <Form title={'Add Task'} handleAdd={Addtask} isformopen={isformopen} toggleform={toggleform}  />

        </div>
    )
}

export default SectionTasks
