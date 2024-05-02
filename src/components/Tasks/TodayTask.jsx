import { Button, Checkbox, Popover } from 'antd'
import React from 'react'
import { CalendarOutlined, EditOutlined, TagOutlined, } from '@ant-design/icons';

function Taskdata({ data, Delete, todaydate, handleedit, handleChecbox, setOpenForm, title }) {
    return (
        <ul key={data.id} style={{ listStyle: 'none' }}>
            <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', width: 770, }}>
                <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            style={{
                                paddingRight: '1rem', marginTop: '-5px'
                            }}
                            onChange={() => {
                                handleChecbox(data.id)
                            }}
                        ></Checkbox>
                        {data.content}</span>
                    <span style={{ fontSize: '13px', color: 'gray', marginTop: '3px', marginBottom: '3px', marginLeft: '2rem' }}>
                        {data.description}
                    </span>
                    <span style={{ color: 'green', fontSize: '15px', width: 130, display: 'flex', justifyContent: 'space-between', marginLeft: '2rem' }} >
                        {title === 'todaydata' ? '' : <span><CalendarOutlined />{data.due?.string === todaydate ? 'Today' : data.due?.string}</span>}
                        {data.labels.map((label) => {
                            return (<span style={{ fontSize: '14px', color: 'slategrey' }}><TagOutlined style={{ marginRight: 3 }} />{label}</span>)
                        })
                        }
                    </span>
                </div>
                <div className="buttons" style={{ width: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { handleedit(data.id); setOpenForm(true) }} />
                    <Popover
                        content={<Button danger onClick={() => Delete(data.id)}>Delete</Button>}
                        trigger="click"
                    >
                        <Button className='listbtn' >{'...'}</Button>
                    </Popover>
                </div>
            </li>
        </ul>
    )
}

export default Taskdata
