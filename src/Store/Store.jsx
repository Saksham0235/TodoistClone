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