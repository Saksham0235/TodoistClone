import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons'
import { Switch } from 'antd';
import { Button, Modal } from 'antd';

const Form = ({ title, handleAdd, editmode, toggle, isFormOpen, handleUpdate }) => {
  // console.log(editmode,"from editmode");
  const [input, setinput] = useState('')
  const [colorName, setColorName] = useState('')
  const [favorite, setFavorite] = useState(false)

  const handlesubmit = (e) => {
    e.preventDefault()
    if (editmode) {
      handleUpdate(input, favorite, colorName)
    }
    else {
      if (!input) {
        alert("Please enter the task")
        return;
      }
      handleAdd(input, favorite, colorName)
    }
    setinput('')
    setFavorite(false)
    setColorName('')
    toggle()
  }
  const onChange = (checked) => {
    console.log(checked, 'From fav check');
    setFavorite(checked)
  };
  useEffect(() => {
    if (editmode) {
      setinput(editmode.name || '')
      setFavorite(editmode.isFavorite || false)
      setColorName(editmode.color || 'charcoal')
    }
    else {
      setinput('')
      setFavorite(false)
      // setColorName('')
    }
  }, [editmode])

  return (
    <>
      <Button onClick={() => toggle()}>
        <PlusOutlined />{title}
      </Button>
      <Modal
        title={title === '' ? 'Add Label' : "Add Project"}
        open={isFormOpen}
        onCancel={() => toggle()}
        onOk={handlesubmit}
        width={500}
        styles={{ height: '250px', overflowY: 'auto' }}
      >
        {
          title === '' ? (<div style={{ height: 100, display: 'flex', justifyContent: 'space-between', }} >
            <form onSubmit={handlesubmit} style={{ display: 'flex', flexDirection: 'column', height: '5rem', justifyContent: 'space-around', width: '12rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 550 }}>Name</label>
              <input type="text" id="name" name="name" value={input} placeholder='Name' onChange={(e) => { setinput(e.target.value); console.log(e.target.value); }} style={{ display: 'flex', flexDirection: 'column', height: '2rem', justifyContent: 'space-between', width: '25rem', border: '1px solid lightgrey', borderRadius: '5px', arginTop: '10px' }} />
            </form>
          </div>) : (<div style={{ height: 200, display: 'flex', justifyContent: 'space-between', }} >
            <form onSubmit={handlesubmit} style={{ display: 'flex', flexDirection: 'column', height: '13rem', justifyContent: 'space-between', width: '12rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 550 }}>Name</label>
              <input type="text" id="name" name="name" value={input} placeholder='Name' onChange={(e) => { setinput(e.target.value); console.log(e.target.value); }} style={{ display: 'flex', flexDirection: 'column', height: '2rem', justifyContent: 'space-between', width: '25rem', border: '1px solid lightgrey', borderRadius: '5px', arginTop: '10px' }} />
              <label style={{ fontSize: '1rem', fontWeight: 550, marginTop: '5px' }}>Color</label>
              <select style={{ width: "25rem", height: 30, border: '1px solid lightgrey', borderRadius: '5px' }} onChange={(e) => { setColorName(e.target.value); }}>
                <option value={'charcoal'}>Charcoal</option>
                <option value={'blue'}>Blue</option>
                <option value={'green'}>Green</option>
                <option value={'red'}>Red</option>
                <option value={'yellow'}>Yellow</option>
                <option value={'grey'}>Grey</option>
                <option value={'orange'}>Orange</option>
                <option value='Mint Green'>Mint Green</option>
                <option value={'Teal'}>Teal</option>
                <option value={'Sky Blue'}>Sky Blue</option>
                <option value={'Violet'}>Violet</option>
                <option value={'Salmon'}>Salmon</option>
              </select>
              <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}>
                <Switch defaultChecked onChange={onChange} checked={favorite} style={{ width: 40, marginRight: '5px' }} />
                <h4 >Favourite</h4>
              </div>
            </form>
          </div>)
        }
      </Modal>
    </>
  );
};
export default Form;