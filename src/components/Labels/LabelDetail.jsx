import React from 'react'
import Form from '../Tasks/Form'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CalendarOutlined, TagOutlined } from '@ant-design/icons'
import { Popover, Button } from 'antd'


function LabelDetail() {
  const params = useParams()
  const prop = params.labelid
  // console.log(prop,"from params");
  let [labelname, labelid] = prop ? prop.split('-') : ''
  // console.log(params,'From params');

  const tasks = useSelector((state) => state.todos.tasks)
  // console.log(tasks,'From Label');
  const taskdata = tasks.filter((task) => task.labels[0] === labelname)

  return (
    <div>
      <h1>{labelname}</h1>
      {
        taskdata.map((data) => (
          <ul key={data.id} style={{ listStyle: 'none' }}>
            {/* <li>
              {data.content}
            </li> */}
            <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', width: 770, }}>
              <div className="div" style={{ display: "flex", flexDirection: 'column' }}>
                <span>{data.content}</span>

                <span style={{ fontSize: '10px', color: 'gray' }}>{data.description}
                  {
                    data.labels.map((label) => {
                      return (
                        <span style={{ fontSize: '14px', color: 'slategrey' }}><TagOutlined style={{ marginRight: 3 }} />{label}</span>
                      )
                    }
                    )
                  }
                </span>
                <span style={{ color: 'grey', fontSize: '15px', }} >
                  <CalendarOutlined />{data.due?.string}
                </span>
              </div>
              <div className="buttons" style={{ width: 100, display: 'flex', justifyContent: 'space-between' }}>
                {/* <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { handleedit(data.id); setisformopen(true) }} /> */}
                <Popover
                  content={<Button danger onClick={() => Delete(data.id)}>Delete</Button>}
                  trigger="click"
                >
                  <Button className='listbtn' >{'...'}</Button>
                </Popover>

              </div>

            </li>
          </ul>
        ))
      }
      <Form title={'Add Task'} />
    </div>
  )
}

export default LabelDetail
