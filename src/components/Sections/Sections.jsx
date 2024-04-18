import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getsections, DeleteSection } from '../../Api/Api'
import { Fetch_Section_Success, Delete_Section_Success } from '../../Store/Features/SectionSlice'
import Form from '../Form'
import Sectionform from './Sectionform'
import SectionTasks from './SectionTasks'
import { Button } from 'antd'
import { createSection } from '../../Api/Api'
import {Add_Section_Success}from '../../Store/Features/SectionSlice'




function Sections({ projectId, tasks }) {
    const dispatch = useDispatch()

    const fetchsections = async (projectId) => {
        try {
            const response = await getsections(projectId)
            console.log(response, "From fetchfunction");
            dispatch(Fetch_Section_Success(response))
        }
        catch (err) {
            console.log('Error in fetching sections', err);
        }
    }
    useEffect(() => {
        fetchsections(projectId)
    }, [projectId,dispatch])

    const data = useSelector((state) => state.Section.sections)
    //  console.log(data, "From sections");

    const Delete = async (id) => {
        const response = await DeleteSection(id);
        console.log("From Delete section :", response);
        dispatch(Delete_Section_Success(response))
    }

    const AddSection = async (input) => {
        const response = await createSection(input,projectId)
        dispatch(Add_Section_Success(response))
    }



    return (
        <div>
            {data.map((item) => (
                <div key={item.id} style={{ width: '30vw', height: 'auto', margin: '20px', border: '1px solid lightgrey', borderRadius: '10px', padding: '10px' }}>
                    <li key={item.id} style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>{item.name} <Button onClick={() => Delete(item.id)}>Delete</Button> <Form  title={'Add Task'} /></li>
                    
                    <SectionTasks sectionid={item.id} projectId={projectId} tasks={tasks} />
                </div>
            ))}
            <Form title={'Add Section'} handleAdd={AddSection}   />

        </div>
    )
}

export default Sections
