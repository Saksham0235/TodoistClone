import {configureStore} from '@reduxjs/toolkit'
import taskSlice from '../Store/Features/TodosSlice'
import ProjectSlice from './Features/ProjectSlice'
import SectionSlice from './Features/SectionSlice'
import LabelSlice from './Features/LabelsSlice' 


 const store=configureStore({
  reducer:{
    todos:taskSlice,
    projects:ProjectSlice,
    Section:SectionSlice,
    Label:LabelSlice
  }
}) 

export default store








  