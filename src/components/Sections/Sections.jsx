import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getsections, DeleteSection } from '../../Api/Api'
import { Fetch_Section_Success, Delete_Section_Success } from '../../Store/Features/SectionSlice'
import SectionTasks from './SectionTasks'
import { Button } from 'antd'
import { createSection, updateTask } from '../../Api/Api'
import { Add_Section_Success } from '../../Store/Features/SectionSlice'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Popover } from 'antd';
import { useSnackbar } from 'notistack';
import SectionForm from './SectionForm'





function Sections({ projectId, tasks, onSectionSelect, selectedSectionId, Addtask}) {
    
    const { enqueueSnackbar } = useSnackbar();
    const [currentProjectId, setCurrentProjectId] = useState(projectId);
    const [selectedId, setSelectedId] = useState(selectedSectionId);
    const [loading, setLoading] = useState(true);
    
    const handleSectionClick = (sectionId) => {
        if (onSectionSelect) {
            setSelectedId(sectionId);
            onSectionSelect(sectionId);
        }
    };

    const dispatch = useDispatch()
    const data = useSelector((state) => state.Section.sections)
    // console.log(data, "From sections");

    const fetchsections = async () => {
        try {
            const response = await getsections(projectId)
            dispatch(Fetch_Section_Success(response))
            setLoading(false)
            enqueueSnackbar("Successfully fetched sections", { variant: 'success' })
        }
        catch (err) {
            enqueueSnackbar('Error in fetching sections', err, {})
        }
    }
    useEffect(() => {
        fetchsections()

    }, [projectId])

    useEffect(() => {
        setCurrentProjectId(projectId);
        setSelectedId(null);
    }, [projectId]);




    const Delete = async (id) => {
        const response = await DeleteSection(id);
        console.log("From Delete section :", response);
        dispatch(Delete_Section_Success(id))
    }

    const AddSection = async (input) => {
        const response = await createSection(input, projectId)
        dispatch(Add_Section_Success(response))
    }
  


    return (
        <div>
            <center><Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></center>
            <SectionForm title={'Add Section'} handleAdd={AddSection} />
            {data.map((item) => (
                <div key={item.id} style={{ width: '40vw', height: 'auto', margin: '20px', border: '1px solid lightgrey', borderRadius: '10px', padding: '10px' }} onClick={() => { handleSectionClick(item.id); console.log('Selectedsectionid', item.id); }}>
                    <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                            <span>{item.name}</span>
                        </div>
                        <Popover
                            content={
                                <Button danger onClick={() => { Delete(item.id) }}>Delete</Button>
                            }
                            trigger="click"
                        >
                            <Button className='listbtn' >{'...'}</Button>
                        </Popover>
                    </li>

                    <SectionTasks sectionid={item.id} projectId={projectId} tasks={tasks} Addtask={Addtask} />
                    {/* <Form title={'Add Task'} handleAdd={Addtask} isformopen={isformopen} toggleform={toggleform} handleupdate={UpdateTask} handleedit={handleedit} /> */}
                </div>
            ))}


        </div>
    )
}

export default Sections
