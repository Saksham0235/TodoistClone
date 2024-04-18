import React, { useState, useEffect } from 'react'
import { getProjects } from '../../Api/Api';
import { Fetch_Project_Success } from '../../Store/Features/ProjectSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Drawer, Space, Typography, Menu } from 'antd';
const { Title } = Typography;
import { PlusSquareOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';



function Projects() {
    const [projectid, setprojectid] = useState('')
    const [open, setOpen] = useState(true);
    const task = useSelector(state => state.todos.tasks)
    const projects = useSelector(state => state.projects.Projects)
    const [placement, setPlacement] = useState('left');
    const dispatch = useDispatch()

    const fetchprojects = async () => {
        const response = await getProjects();
        dispatch(Fetch_Project_Success(response))
    }

    const showDrawer = () => {
        setOpen(true);
    };
    const onChange = (e) => {
        setPlacement(e.target.value);
    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => { fetchprojects() }, [])

    const handleProjectid = (id) => {
        setprojectid(id)
    }
    const [current, setCurrent] = useState('1');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
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
                    {/* <Form /> */}
                    <hr />
                    <div className="bottom">
                        <Menu
                            onClick={onClick}
                            style={{
                                width: 300
                            }}
                            defaultOpenKeys={['sub1']}
                            selectedKeys={[current]}
                            mode="inline"
                        >
                            <Menu.SubMenu key="sub1" title={<Title level={2}>My Projects  <PlusSquareOutlined style={{ fontSize: '20px', marginLeft: 10 }} /> </Title>}>
                                {
                                    projects.map((data) => {
                                        return (
                                            <Menu.Item key={data.id} style={{ fontSize: '20px' }} onClick={() => handleProjectid(data.id)}>

                                                <Link to={`/projects/${data.id}`}>
                                                    {data.name}
                                                </Link>

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
