import React, { useState } from 'react';
import {  ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import './form.css'


const SectionForm = ({ title, handleAdd }) => {
      const [showForm, setShowForm] = useState(false);
      const [input, setinput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        handleAdd(input)
        setinput('')
        setShowForm(false);
    }
    const toggle = () => {
        setShowForm(!showForm)
    }

    return (
        <ConfigProvider button={{style: {width: 100,margin: 4,  }, }} >
            <div style={{ clear: 'both', whiteSpace: 'nowrap' }}>
                {showForm ? (
                    <form onSubmit={handleSubmit} style={{marginLeft:'28px',marginTop:'20px'}}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={input}
                            placeholder="Name this section"
                            onChange={(e) => setinput(e.target.value)}
                            style={{width:770,height:30,padding:'5px'}}
                        />
                        <div className="buttons">
                            <button type="submit" className='addbtn' style={{ width: '6rem' }}>Add section</button>
                            <button className='cancelbtn' onClick={() => toggle()}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className='btndiv' style={{ width: 780, marginLeft: "28px", border: 'none', display: 'flex', alignItems: 'center' }}>
                        <div style={{ borderBottom: '0.5px solid red', flex: '1', marginRight: '8px', width: 500 }}></div>

                        <button className='btn' onClick={() => setShowForm(true)}>
                            <PlusOutlined style={{ marginRight: '8px' }} />
                            {title}
                        </button>
                        <div style={{ borderBottom: '0.5px solid red', flex: '1', marginLeft: '8px' }}></div>
                    </div>
                )}
            </div>
        </ConfigProvider>
    );
};
export default SectionForm;