import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../Api/Api'
import { Delete_Task_Success } from '../../Store/Features/TodosSlice'
import { Button, Popover } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
function SectionTasks({ sectionid, projectId, tasks }) {
    // console.log('From SectionTasks',tasks);

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
                                {/* <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                                        <span> {data.content}</span><span style={{ color: 'grey', fontSize: '15px' }}><CalendarOutlined />{data.due?.string}</span>
                                    </div>
                                    <Popover
                                        content={
                                            <Button danger onClick={() => Delete(data.id)}>Delete</Button>
                                        }
                                        title="Confirmation"
                                        trigger="click"
                                    >
                                        <Button className='listbtn'>Delete Task</Button>
                                    </Popover>
                                    <Button onClick={() => Delete(data.id)} className='listbtn' >Delete</Button>
                                </li> */}

                                <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
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
                                        // title="Confirmation"
                                        trigger="click"
                                    >
                                        <Button className='listbtn' >{'...'}</Button>
                                    </Popover>
                                </li>

                            </ul>
                        )
                    })
            }

        </div>
    )
}

export default SectionTasks
