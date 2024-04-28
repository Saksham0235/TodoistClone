import React, { useState, useEffect } from 'react';
import { Button, ConfigProvider, Popover, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
const text = <span>Title</span>;
import { useSelector } from 'react-redux';
import './task.css'


const Form = ({ title, handleAdd, editmode, isformopen, toggleform, handleupdate }) => {
  // console.log('Selected Project id', projectId);
  const [selecteddate, setselecteddate] = useState(null)
  const [selectedstring, setselectedstring] = useState('')
  const [input, setinput] = useState('')
  const [description, setDescription] = useState('')
  const [selectedProjectName, setSelectedProjectName] = useState('')
  const Labeldata = useSelector((state) => state.Label.Labels)
  const projectnames = useSelector(state => state.projects.Projects)
  const [selectedProjectId, setselectedProjectId] = useState('2331888192')
  const [selectedLabel, setSelectedLabel] = useState([])



  const handleSubmit = (e) => {
    e.preventDefault()
    if (editmode) {
      handleupdate(input, selecteddate, selectedstring, description, selectedProjectId, selectedLabel)
    }
    else {
      if (!input) {
        alert("Please enter the task")
        return;
      }
      handleAdd(input, selecteddate, selectedstring, description, selectedProjectId, selectedLabel);
    }

    setinput('')
    setDescription('')
    toggleform()
  }
  const onChange = (date, dateString) => {

    const str = String(date?.$d)
    const string = str.slice(4, 10)

    setselecteddate(dateString, string)
    setselectedstring(string)
    console.log(date, "Date");
    console.log("String ", string);
  };
  useEffect(() => {
    if (editmode && editmode.content && editmode.due.date && editmode.labels && editmode.projectId) {
      console.log(editmode, "From useffect");
      setinput(editmode.content)
      if (editmode.due.date) {
        setselecteddate(editmode.due.date)
        console.log(editmode.due.date, "useffect");
      }
      if (editmode.projectId) {
        console.log(editmode.projectId, "From edit projectid");
        setselectedProjectId(editmode.projectId)
      }
      if (editmode.description) {
        setDescription(editmode.description)
      }
      if (editmode.labels) {
        setSelectedLabel(editmode.labels)
      }
    }
    else {
      setinput('')
      setDescription('')
      setselectedstring('');
    }
  }, [editmode]);

  return (
    <ConfigProvider
      button={{
        style: {
          width: 100,
          margin: 4,
        },
      }}
    >
      {isformopen ? (
        <form onSubmit={handleSubmit} className='form' style={{ display: 'flex', flexDirection: 'column', height: '10rem', justifyContent: 'space-between', padding: '5px', marginLeft: '30px', borderRadius: '7px' }}>
          <input type="text" id="name" name="name" value={input} placeholder='Name' onChange={(e) => { setinput(e.target.value); console.log(e.target.value); }} style={{ display: 'flex',border:'none', flexDirection: 'column', outline: 'none', height: '2rem', justifyContent: 'space-between', width: 750,  fontSize: '15px' }} />
          <textarea placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value); console.log(e.target.value); }} style={{ border: 'none', outline: 'none' }} />
          <Space direction="vertical">
            <DatePicker onChange={onChange} />
          </Space>

          <div className="options" style={{ display: 'flex', justifyContent: 'space-between',alignItems:'center',marginTop:10 }}>

            <select style={{ width: 80, height: 30, cursor: 'pointer',border:'none' }} onChange={(e) => { setselectedProjectId(e.target.value); console.log(e.target.value, "From selecting projectname"); }}>
              {projectnames.map((project) => (
                <option value={project.id} >{project.name}</option>
              ))}
            </select>
            {
              Labeldata &&
              <select style={{ width: 100, cursor: 'pointer',border:'none',height:30 }}
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  console.log(selectedOption, "From selecting");
                  setSelectedLabel([selectedOption]);
                }
                }>
                {/* <option value={null}>Select Label</option> */}
                {Labeldata.map((data) => (
                  <option value={data.name}>{data.name}</option>
                ))
                }
              </select>
            }
            <div className="buttons">
              <button onClick={handleSubmit} className='addbutton'>{editmode ? "Update Task" : "Add Task"}</button>
              <button onClick={() => toggleform()} className='cancelbutton' >Cancel</button>
            </div>
          </div>
        </form>
      ) : (<div
        style={{
          clear: 'both',
          whiteSpace: 'nowrap',
        }}
      >
        <Button className='addicon' onClick={() => toggleform()} style={{ width: 'auto', marginLeft: "30px", display: 'flex', border: 'none' }}><PlusOutlined />{title}</Button>

      </div>)}



    </ConfigProvider >
  );
};
export default Form;