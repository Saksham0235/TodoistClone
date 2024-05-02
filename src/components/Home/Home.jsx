import React, { useEffect } from 'react';
import './home.css'
import Tasks from '../Tasks/Tasks'
import LabelDetail from '../Labels/LabelDetail';
import { Routes,Route } from 'react-router-dom';
import Projects from '../Sidebar/Projects';
import {getLabels} from '../../Api/Api'
import Labels from '../Labels/Labels';
import {fetchLabelSuccess} from '../../Store/Features/LabelsSlice'
import { useDispatch } from 'react-redux';


const Home = () => {
    const dispatch=useDispatch()
    const fetchlabels = async () => {
        try {
            const response = await getLabels()
            dispatch(fetchLabelSuccess(response))
        }
        catch (err) {
           console.log('Error in fetchLabels' ,err);
        }
    }
    useEffect(()=>{
        fetchlabels()
    },[])
    return (

        <section className='main' style={{display:'flex',width:'99vw'}}>
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