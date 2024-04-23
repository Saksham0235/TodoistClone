import React, { useState, useEffect } from 'react'
import { getProjects, createProject, DeleteProject } from '../../Api/Api';
import { Fetch_Project_Success, Create_Project, Delete_Project_Success } from '../../Store/Features/ProjectSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Drawer, Space, Typography, Menu } from 'antd';
const { Title } = Typography;
import { Link, useNavigate  } from 'react-router-dom';
import ProjectForm from './ProjectForm'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useSnackbar } from 'notistack';
import './project.css'



function Projects() {

    const { enqueueSnackbar } = useSnackbar();

    const [projectid, setprojectid] = useState('')
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const task = useSelector(state => state.todos.tasks)
    const projects = useSelector(state => state.projects.Projects)
    const [placement, setPlacement] = useState('left');
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('1');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const navigate =useNavigate();
    const fetchprojects = async () => {
        try {
            const response = await getProjects();
            dispatch(Fetch_Project_Success(response))
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

    const AddProject = async (name) => {
        try {
            const response = await createProject(name)
            dispatch(Create_Project(response))
        }
        catch (error) {
            console.log(error)
            enqueueSnackbar("Failed in adding PRoject", error, { variant: 'error' })
        }
    }

    const Delete = async (id) => {
        try {
            const response = await DeleteProject(id)
            console.log(response, "From DeleteFunction");
            dispatch(Delete_Project_Success(id))
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { fetchprojects() }, [projectid])

    const HomePage=()=>{
        navigate('/')
        setprojectid(null)
        setSelectedProject('')
    }


    return (
        <div>
            <div className="left">
                <Button type="primary" onClick={showDrawer}>
                    Open
                </Button>
                <Drawer
                    title="Sahil"
                    placement={placement}
                    width={400}
                    onClose={onClose}
                    open={open}
                    mask={false}
                    closeIcon={null}
                    extra={
                        <Space>
                            <Button type="primary" onClick={onClose}>
                                Close
                            </Button>
                        </Space>
                    }
                >
                    <Button onClick={HomePage}>Home</Button>
                    <hr />


                    <div className="bottom">
                        <Menu
                            onClick={onClick}
                            style={{
                                width: 350
                            }}
                            defaultOpenKeys={['sub1']}
                            selectedKeys={[current]}
                            mode="inline"
                        >
                            <Menu.SubMenu key="sub1" title={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Title level={4} style={{ marginBottom: '30px' }}>My Projects</Title><ProjectForm title={""} handleAdd={AddProject} onClick={handleFormClick} /></div>}>
                                <center> <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24, margin: 'auto' }} spin />} /></center>
                                {
                                    projects.map((data) => {
                                        return (
                                            <Menu.Item warnkey={data.id} style={{ fontSize: '20px', display: 'flex', justifyContent: 'space-between' }} onClick={() => handleProjectid(data.id)}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Link to={`/projects/${data.id}-${data.name}`} className={selectedProject === data.id ? 'selected' : ''}>
                                                        {data.name}
                                                    </Link>
                                                    <Button onClick={() => Delete(data.id)} >Delete</Button>
                                                </div>

                                            </Menu.Item>
                                        )
                                    })
                                }
                            </Menu.SubMenu>
                        </Menu>

                    </div>
                </Drawer>
            </div>

        </div>
    )
}

export default Projects
