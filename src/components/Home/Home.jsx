import React, { useEffect, useState } from 'react';
import { Button, Drawer, Space, Typography, Menu } from 'antd';
const { Title } = Typography;
import './home.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, deleteTask, getProjects } from '../../Api/Api';
import { Fetch_Project_Success } from '../../Store/Features/ProjectSlice'

import Tasks from '../Tasks';
import Sections from '../Sections/Sections'
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Projects from '../Sidebar/Projects';


const Home = () => {

    return (

        <section className='main'>
            <div className="left">

            <Projects />
            </div>
            <div className="right">
                <Title level={2}>Today</Title>
               
                <Routes>
                    <Route path='/' element={<Tasks/>} />
                    <Route path='/projects/:projectId' element={<Tasks />} />
                </Routes>
            </div>


        </section>
    );
};

export default Home