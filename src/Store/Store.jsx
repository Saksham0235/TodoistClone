import {configureStore} from '@reduxjs/toolkit'
import taskSlice from '../Store/Features/TodosSlice'
import ProjectSlice from './Features/ProjectSlice'
import SectionSlice from './Features/SectionSlice'


 const store=configureStore({
  reducer:{
    todos:taskSlice,
    projects:ProjectSlice,
    Section:SectionSlice
  }
}) 

export default store








    // {
                // task.filter(data => setprojectid === null || data.projectId === projectid)
                // task.filter(task => (!projectId || task.projectId === projectId) && (task.sectionId === null))
            //     projectId?tasklist:todaydata.map((data) => {
            //             return (
            //                 <ul key={data.id} style={{ listStyle: 'none' }}>
            //                     <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>{data.content}  <Button onClick={() => Delete(data.id)} className='listbtn' >Delete</Button></li>
            //                 </ul>
            //             )
            //         })
            // }