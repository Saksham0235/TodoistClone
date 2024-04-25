import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask ,createSectionTask  } from '../../Api/Api'
import { DeleteTask,Create } from '../../Store/Features/TodosSlice'
import { Button, Popover } from 'antd';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import Form from '../Tasks/Form';
function SectionTasks({ sectionid, projectId, tasks,Addtask ,selectedSectionId}) {
    // console.log('From SectionTasks',selectedSectionId);
    const [isformopen, setisformopen] = useState(false)
    const toggleform = () => {
        setisformopen(!isformopen)
    }

    const dispatch = useDispatch()
    const Delete = async (id) => {
        const response = await deleteTask(id);
        dispatch(DeleteTask(id))
    }
    const AddSectiontask = async (name, date, string,description) => {

        try {
            const response = await createSectionTask(name, projectId, date, selectedSectionId, string,description)
            dispatch(Create(response))
            
        }
        catch (error) {
            console.log(error)
        }
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
                                        <span style={{fontSize:'10px',color:'gray'}}>{data.description}</span>
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
            <Form title={'Add Task'} handleAdd={AddSectiontask} isformopen={isformopen} toggleform={toggleform}  />

        </div>
    )
}

export default SectionTasks
