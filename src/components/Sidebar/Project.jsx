import { Button, Popover,Switch } from 'antd';
import React from 'react'
import './project.css'

function Project({data,deleteProjId,toggleFavorite,handleEdit,setisFormOpen}) {
    return (
        <button className='projectbtn' >
            <div>
                <span style={{ color: data.color, marginRight: 5 }}>#</span>{data.name}
            </div>
            <span>
                <Popover trigger="click"
                    content={
                        <div style={{ display: 'flex', height: 100, width: 120, justifyContent: 'space-around', flexDirection: 'column' }}>
                            <Button danger onClick={() => { deleteProjId(data.id) }}>Delete</Button>
                            <Button style={{ border: 'none' }} onClick={() => { handleEdit(data.id); setisFormOpen(true) }} >Edit</Button>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                <Switch defaultChecked onChange={() => toggleFavorite(data.id, data.isFavorite)} checked={data.isFavorite} style={{ width: 40, marginRight: '5px' }} />
                                <h4 >Favourite</h4>
                            </div>
                        </div>
                    }>
                    <Button className='listbtn' style={{ border: 'none', background: 'transparent', outline: 'none' }} ><span style={{ fontSize: '20px', marginTop: '-1rem' }}>{'...'}</span></Button>
                </Popover>
            </span>
        </button>
    )
}

export default Project
