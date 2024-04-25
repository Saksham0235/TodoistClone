import React, { useEffect, useState } from 'react';
import { Typography,  } from 'antd';
const { Title } = Typography;
import './home.css'
import Tasks from '../Tasks/Tasks'
import LabelDetail from '../Labels/LabelDetail';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Projects from '../Sidebar/Projects';

import Labels from '../Labels/Labels';


const Home = () => {

    return (

        <section className='main'>
            <div className="left">

            <Projects />
            </div>
            <div className="right">
               
               
                <Routes>
                    <Route path='/' element={<Tasks/>} />
                    <Route path='/app/label' element={<Labels />} />
                    <Route path='/app/label/:labelid' element={<LabelDetail />} />
                    <Route path='/projects/:projectId' element={<Tasks />} />
                </Routes>
            </div>


        </section>
    );
};

export default Home