import React, { useState, useEffect } from 'react';
import { Button, ConfigProvider, Popover, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
const text = <span>Title</span>;
import { useSelector } from 'react-redux';


const Form = ({ title, handleAdd, projectId, editmode, isformopen, toggleform, handleupdate }) => {
  // console.log('Selected Project id', projectId);
  const [selecteddate, setselecteddate] = useState(null)
  const [selectedstring, setselectedstring] = useState('')
  const [input, setinput] = useState('')
  const [description, setDescription] = useState('')
  const [selectedProjectName, setSelectedProjectName] = useState('')
  const Labeldata = useSelector((state) => state.Label.Labels)
  const projectnames = useSelector(state => state.projects.Projects)
  const [selectedProjectId, setselectedProjectId] = useState(projectId)


  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedProject = projectnames.find(project => project.name === selectedProjectName);
    if (editmode) {
      handleupdate(input, selecteddate, selectedstring, description, selectedProjectId)
    }
    else {
      if (!input) {
        alert("Please enter the task")
        return;
      }
      handleAdd(input, selecteddate, selectedstring, description, selectedProjectId);
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
    if (editmode && editmode.content && editmode.due.date) {
      console.log(editmode, "From useffect");
      setinput(editmode.content)
      if (editmode.due.date) {
        setselecteddate(editmode.due.date)
        console.log(editmode.due.date, "useffect");
      }
      if (editmode.projectId) {
        const selectedProject = projectnames.find(project => project.name === selectedProjectName);
        if (selectedProject) {
          setselectedProjectId(selectedProject.id);
        }
      }
      if (editmode.description) {
        setDescription(editmode.description)
      }
    }
    else {
      setinput('')
      setDescription('')
      setselectedstring('');
    }
  }, [editmode]);
  // const projectnames = useSelector(state => state.projects.Projects)

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
        <form onSubmit={handleSubmit} className='form' style={{ display: 'flex', flexDirection: 'column', height: '8rem', justifyContent: 'space-between', padding: '5px', marginLeft: '30px', }}>
          <input type="text" id="name" name="name" value={input} placeholder='Name' onChange={(e) => { setinput(e.target.value); console.log(e.target.value); }} style={{ display: 'flex', flexDirection: 'column', outline: 'none', height: '2rem', justifyContent: 'space-between', width: '15rem', border: 'none', fontSize: '15px' }} />
          <textarea placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value); console.log(e.target.value); }} style={{ border: 'none', outline: 'none' }} />
          <Space direction="vertical">
            <DatePicker onChange={onChange} />
          </Space>

          <div className="options" style={{ display: 'flex', justifyContent: 'space-between' }}>

            <select value={selectedProjectName} style={{ width: 100, height: 30, marginTop: 10, cursor: 'pointer' }} onChange={(e) => setSelectedProjectName(e.target.value)}>
              <option value={null}>Select Project</option>
              {projectnames.map((project) => (
                <option value={project.name} >{project.name}</option>
              ))}
            </select>
            {
              Labeldata &&
              <select style={{ width: 60, cursor: 'pointer' }} >
                {Labeldata.map((data) => (
                  <option value={data.name}>{data.name}</option>
                ))
                }
              </select>
            }
            <div className="buttons">
              <Button onClick={handleSubmit} style={{ width: '5rem' }}>Ok</Button>
              <Button onClick={() => toggleform()}>Cancel</Button>
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