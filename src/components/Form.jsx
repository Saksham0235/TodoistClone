
import React, { useState, useEffect } from 'react';
import { Button, ConfigProvider, Popover, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
const text = <span>Title</span>;


const Form = ({ title, handleAdd, editmode, isformopen, toggleform, handleupdate }) => {
  console.log(editmode,"From fomrjs");
  console.log();
  const [open, setOpen] = useState(isformopen);
  const [selecteddate, setselecteddate] = useState(null)
  const [selectedstring, setselectedstring] = useState('')
  const [input, setinput] = useState('')


  useEffect(() => {
    setOpen(isformopen);
  }, [isformopen]);



  useEffect(() => {
    if (editmode) {
      setinput(editmode.content)
    }
    else {
      setinput('')
      setselecteddate(null);
      setselectedstring('');
    }
  }, [editmode]);


  const handlesubmit = (e) => {
    e.preventDefault()

    if (editmode) {
      handleupdate(input, selecteddate, selectedstring)
    }
    else {
      handleAdd(input, selecteddate, selectedstring);
    }

    setinput('')
    setselecteddate(null)
    setselectedstring('')
    setOpen(false)
  }
  const onChange = (date, dateString) => {

    const str = String(date?.$d)
    const string = str.slice(4, 10)

    setselecteddate(dateString, string)
    setselectedstring(string)
    console.log(date, "Date");
    console.log("String ", string);
  };
  return (
    <ConfigProvider
      button={{
        style: {
          width: 100,
          margin: 4,
        },
      }}
    >

      <div
        style={{
          clear: 'both',
          whiteSpace: 'nowrap',
        }}
      >
        <Popover placement="bottomLeft" title={text} content={(
          <div>
            <form onSubmit={handlesubmit} style={{ display: 'flex', flexDirection: 'column', height: '8rem', justifyContent: 'space-between', width: '15rem' }}>
              <input type="text" id="name" name="name" value={input} placeholder='Name' onChange={(e) => { setinput(e.target.value); console.log(e.target.value); }} style={{ display: 'flex', flexDirection: 'column', height: '2rem', justifyContent: 'space-between', width: '15rem', border: 'none' }} />
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
              <div className="buttons">
                <Button onClick={handlesubmit} style={{ width: '5rem' }}>ADD</Button>
                <Button onClick={()=> toggleform()}>Cancel</Button>
              </div>
            </form>
          </div>
        )} open={open}
          onOpenChange={(open) => setOpen(open)} trigger="click">
          <Button onClick={() => toggleform()} style={{ width: 'auto', marginLeft: "28px", display: 'flex' }}><PlusOutlined />{title}</Button>
        </Popover>

      </div>

    </ConfigProvider >
  );
};
export default Form;