import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getsections } from '../../Api/Api'
import {Fetch_Section_Success} from '../../Store/Features/SectionSlice'
import Form from '../Form'
import Sectionform from './Sectionform'
import SectionTasks from './SectionTasks'
import { Button } from 'antd'




function Sections({projectId,tasks}) {
    // console.log(projectId,"Projectid");
    
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchsections = async (projectid) => {
            const response = await getsections(projectid)
            dispatch(Fetch_Section_Success(response))
        }
        if(projectId)
        {
            fetchsections(projectId)
        }
    },[projectId])

    const data = useSelector(state => 
        state.Section.sections
    )


    return (
        <div>
            {data.map((item)=>(
                <div style={{width:'30vw',height:'auto',margin:'20px',border:'1px solid lightgrey',borderRadius:'10px',padding:'10px'}}>
                    <li key={item.id} style={{listStyle:'none',display:'flex',justifyContent:'space-between'}}>{item.name} <Form sectionid={item.id}/></li>
                    <SectionTasks sectionid={item.id} projectId={projectId}  tasks={tasks}/>
                </div>
            ))}
            <Sectionform projectId={projectId}/>

        </div>
    )
}

export default Sections
