import React, { useMemo, useState } from 'react';
import { Button, ConfigProvider, Popover } from 'antd';
import {PlusOutlined } from '@ant-design/icons'
const text = <span>Title</span>;
const buttonWidth = 80;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const Form = ({ title,handleAdd }) => {
  const [arrow, setArrow] = useState('Show');
  const [open, setOpen] = useState(false);
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }
    if (arrow === 'Show') {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const [input, setinput] = useState('')

  const handlesubmit = (e) => {
    e.preventDefault()
    handleAdd(input)
    setinput('')
    setOpen(false)
  }
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
            <form onSubmit={handlesubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={input} onChange={(e) => {setinput(e.target.value);console.log(e.target.value);}} />
              <button type="submit">ADD</button>
            </form>
          </div>
        )} arrow={mergedArrow} open={open}
          onOpenChange={(open) => setOpen(open)} trigger="click">
          <Button onClick={() => setOpen(!open)} style={{width:'auto',marginLeft:"40px"}}><PlusOutlined />{title}</Button>
        </Popover>

      </div>

    </ConfigProvider >
  );
};
export default Form;