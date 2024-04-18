import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../Api/Api'
import { Delete_Task_Success } from '../../Store/Features/TodosSlice'
import { Button } from 'antd';

function SectionTasks({sectionid,projectId,tasks}) {
    // console.log('From SectionTasks',tasks);

    const dispatch=useDispatch()
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
                                <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>{data.content}  <Button onClick={() => Delete(data.id)} className='listbtn' >Delete</Button></li>
                            </ul>
                        )
                    })
            }
      
    </div>
  )
}

export default SectionTasks
