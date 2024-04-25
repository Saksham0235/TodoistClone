import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getsections, deleteSection, updateSectionAction } from '../../Api/Api'
import { fetchSection, deleteSectionAction, addSection, updateSection } from '../../Store/Features/SectionSlice'
import SectionTasks from './SectionTasks'
import { Button } from 'antd'
import { createSection } from '../../Api/Api'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Popover } from 'antd';
import { useSnackbar } from 'notistack';
import SectionForm from './SectionForm'





function Sections({ projectId, tasks, }) {

    const { enqueueSnackbar } = useSnackbar();
    const [currentProjectId, setCurrentProjectId] = useState(projectId);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const [loading, setLoading] = useState(true);    
    const [editSectionId, setEditSectionId] = useState(null)
    const [sectionName, setSectionName] = useState('')

    const handleSectionSelect = (sectionId) => {
        // console.log(sectionId,"From selection id func");
        setSelectedSectionId(sectionId);
    };

    const dispatch = useDispatch()
    const data = useSelector((state) => state.Section.sections)
    // console.log(data, "From sections");

    const fetchSections = async () => {
        try {
            const response = await getsections(projectId)
            dispatch(fetchSection(response))
            setLoading(false)
            enqueueSnackbar("Successfully fetched sections", { variant: 'success' })
        }
        catch (err) {
            enqueueSnackbar('Error in fetching sections', err, {})
        }
    }
    useEffect(() => {
        fetchSections()

    }, [projectId])

    useEffect(() => {
        setCurrentProjectId(projectId);
        // setSelectedId(null);
        setSelectedSectionId(null)
    }, [projectId]);


    const deleteSectionId = async (id) => {
        const response = await deleteSection(id);
        // console.log("From Delete section :", response);
        dispatch(deleteSectionAction(id))
    }

    const AddSection = async (input) => {
        const response = await createSection(input, projectId)
        dispatch(addSection(response))
    }
    const handleEditClick = (id, name) => {
        setSectionName(name)
        setEditSectionId(id)
    }
    const handleUpdateSection = async (id) => {
        // console.log(id, "From update function");
        try {
            const response = await updateSectionAction(id, sectionName);
            dispatch(updateSection(response))
            setEditSectionId(null);
            setSectionName('');
        }
        catch (err) {
            console.log('Error updating section', err);
        }

    }



    return (
        <div>
            <center><Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></center>
            <SectionForm title={'Add Section'} handleAdd={AddSection} />
            {data.map((item) => (
                <div key={item.id} style={{ width: '40vw', height: 'auto', margin: '20px', border: '1px solid lightgrey', borderRadius: '10px', padding: '10px' }} onClick={() => { handleSectionSelect(item.id); console.log('Selectedsectionid', item.id); }}>
                    {editSectionId === item.id ? (
                        <form onSubmit={(e)=>{e.preventDefault();handleUpdateSection(item.id)}} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 80 }}>
                            <input value={sectionName} onChange={(e) => setSectionName(e.target.value)} style={{ height: 40,fontSize:'16px' }} />
                            <div style={{ display: 'flex' }}>
                                <Button style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 600 }} onClick={() => handleUpdateSection(item.id)}>Save</Button>
                                <Button style={{border: 'none', borderRadius: '5px', fontWeight: 600 }}onClick={() => setEditSectionId(null)}>Cancel</Button>
                            </div>
                        </form>
                    ) : (
                        <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                            <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                                <span>{item.name}</span>
                            </div>
                            <Popover
                                content={
                                    <div style={{ display: 'flex', height: 100, width: 100, justifyContent: 'space-around', flexDirection: 'column' }}>
                                        <Button danger onClick={() => { deleteSectionId(item.id) }}>Delete</Button>
                                        <Button onClick={() => handleEditClick(item.id, item.name)}>Edit</Button>
                                    </div>
                                }
                                trigger="click"
                            >
                                <Button className='listbtn' >{'...'}</Button>
                            </Popover>
                        </li>
                    )}
                    <SectionTasks sectionid={item.id} projectId={projectId} tasks={tasks} selectedSectionId={selectedSectionId} />
                </div>
            ))
            }
            <SectionForm title={'Add Section'} handleAdd={AddSection}  />



        </div >
    )
}

export default Sections
