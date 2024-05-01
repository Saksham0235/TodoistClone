import React, { useState, useEffect } from 'react'
import { getProjects, createProject, DeleteProject, updateProject, updateFavourite } from '../../Api/Api';
import { fetchProjectsAction, createProjectAction, deleteProjectAction, updateProjectAction, updateFavouriteAction, } from '../../Store/Features/ProjectSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Drawer, Space, Typography, Menu } from 'antd'
const { Title } = Typography;
import { Link, useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm'
import { LoadingOutlined, CalendarOutlined, AppstoreOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useSnackbar } from 'notistack';
import './project.css'
import Project from './Project';


function Projects() {

    const { enqueueSnackbar } = useSnackbar();

    const [projectid, setprojectid] = useState('')
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const projects = useSelector(state => state.projects.Projects)
    const favprojects = projects.filter((project) => project.isFavorite)
    // console.log(favprojects, "From favprojects");
    // console.log(projects, "From projects");
    const [placement, setPlacement] = useState('left');
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('1');
    const [editData, setEditData] = useState('')
    const [isFormOpen, setisFormOpen] = useState(false)

    const toggleFavorite = async (id, isFavorite) => {
        console.log(updateFavourite, ' updated favorites');
        try {
            const response = await updateFavourite(id, { isFavorite: !isFavorite })
            dispatch(updateFavouriteAction(response))
            enqueueSnackbar(isFavorite ? "Removed from favorites" : 'Added to Favorites', { variant: 'success' })
        }
        catch (error) {
            console.log("Failed to update favorite", error);
            enqueueSnackbar("Failed to update favorite", error, { variant: 'error' })
        }
    };
    const onClick = (e) => {
        setCurrent(e.key);
    };
    const navigate = useNavigate();
    const fetchprojects = async () => {
        try {
            const response = await getProjects();
            dispatch(fetchProjectsAction(response))
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            enqueueSnackbar("Failed in fetching Projects", error, { variant: 'error' })
        }
    }
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleProjectid = (id) => {
        setprojectid(id)
    }
    const handleFormClick = (e) => {
        e.stopPropagation();
    };
    const toggle = () => {
        console.log(isFormOpen, "State of Form");
        setisFormOpen(() => !isFormOpen)
        setEditData(null)
    }
    const addProject = async (name, isFavorite, color) => {
        try {
            const response = await createProject(name, isFavorite, color)
            dispatch(createProjectAction(response))
        }
        catch (error) {
            console.log(error)
            enqueueSnackbar("Failed in adding PRoject", error, { variant: 'error' })
        }
    }
    const handleUpdate = async (name, favorite, color) => {
        console.log(name, 'FRom update function');
        try {
            const response = await updateProject(editData.id, name, favorite, color)
            dispatch(updateProjectAction(response))
        }
        catch (err) {
            console.log('Error updating project', err);
        }
    }
    const deleteProjId = async (id) => {
        try {
            const response = await DeleteProject(id)
            // console.log(response, "From DeleteFunction");
            dispatch(deleteProjectAction(id))
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { fetchprojects() }, [projectid])
    const HomePage = () => {
        navigate('/')
        setprojectid(null)
    }
    const LabelPage = () => {
        navigate('/app/label')
    }
    const handleEdit = (id) => {
        console.log(id, 'From selected project');
        const dataset = projects.filter((project) => project.id === id)
        const data = dataset[0]
        setEditData(data)
    }
    return (
        <div>
            <div className="left">
                <Button onClick={showDrawer} style={{ border: 'none' }}>
                    <RightCircleOutlined style={{ fontSize: '20px' }} />
                </Button>
                <Drawer title="Sahil" placement={placement} width={400} onClose={onClose} open={open} mask={false} closeIcon={null}
                    extra={
                        <Space>
                            <Button onClick={onClose} style={{ border: 'none' }}>
                                <LeftCircleOutlined style={{ fontSize: '20px' }} />
                            </Button>
                        </Space>
                    }>
                    <div className="homebuttons" style={{ display: 'flex', flexDirection: 'column', height: 100, justifyContent: 'space-around', alignItems: 'flex-start' }}>
                        <button onClick={HomePage} className='homebtn'><span ><CalendarOutlined style={{ marginRight: 5 }} />Today</span></button>
                        <button className='labelbtn' onClick={LabelPage} style={{ border: "transparent", fontSize: "20px" }}><span><AppstoreOutlined style={{ marginRight: 5 }} />Labels</span></button>
                    </div>
                    <hr style={{ width: '19vw' }} />
                    {
                        favprojects.length > 0 &&
                        <>
                            <h2>Favourites</h2>
                            {(favprojects.map((data) => (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 200, alignItems: 'center', marginLeft: 5 }} onClick={() => handleProjectid(data.id)}>
                                        <Link to={`/projects/${data.id}-${data.name}`} style={{ fontSize: '18px', color: 'black' }} >
                                            <Project data={data} deleteProjId={deleteProjId} toggleFavorite={toggleFavorite} handleEdit={handleEdit} setisFormOpen={setisFormOpen} />
                                        </Link>
                                    </div>
                                </div>))
                            )}
                        </>
                    }
                    <div className="bottom">
                        <Menu onClick={onClick} selectable={false} style={{ width: 450, }} mode="inline">
                            <div className="menudiv" style={{ display: 'flex' }}>
                                <Menu.SubMenu key="sub1" style={{ width: '300px' }} title={<Title level={4} style={{ marginBottom: '30px' }}>My Projects</Title>}>
                                    <center> <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24, margin: 'auto' }} spin />} /></center>
                                    {projects.map((data) => {
                                        return (
                                            <Menu.Item warnkey={data.id} style={{ fontSize: '20px', display: 'flex', justifyContent: 'space-between', outline: 'none', marginLeft: '-12px' }} onClick={() => handleProjectid(data.id)}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Link to={`/projects/${data.id}-${data.name}`} >
                                                        <Project data={data} deleteProjId={deleteProjId} toggleFavorite={toggleFavorite} handleEdit={handleEdit} setisFormOpen={setisFormOpen} />
                                                    </Link>
                                                </div>
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu.SubMenu>
                                <div style={{ marginTop: '10px' }}>
                                    <ProjectForm title={""} handleAdd={addProject} onClick={handleFormClick} editmode={editData} toggle={toggle} isFormOpen={isFormOpen} handleUpdate={handleUpdate} />
                                </div>
                            </div>
                        </Menu>
                    </div>
                </Drawer>
            </div >
        </div >
    )
}

export default Projects
