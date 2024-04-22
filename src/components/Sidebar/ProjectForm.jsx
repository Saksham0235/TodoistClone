
import React, { useMemo, useState } from 'react';
import { Button, ConfigProvider, Popover, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
const text = <span>Title</span>;
const buttonWidth = 80;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const Form = ({ title, handleAdd }) => {
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

    handleAdd(input,selecteddate,selectedstring)
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
            <form onSubmit={handlesubmit} style={{ display: 'flex', flexDirection: 'column', height: '6rem', justifyContent: 'space-between', width: '15rem' }}>
              <input type="text" id="name" name="name" value={input} placeholder='Name' onChange={(e) => { setinput(e.target.value); console.log(e.target.value); }} style={{ display: 'flex', flexDirection: 'column', height: '2rem', justifyContent: 'space-between', width: '15rem', border: 'none' }} />
              <div className="buttons">
                <Button onClick={handlesubmit} style={{ width: '5rem' }}>ADD</Button>
                <Button onClick={() => setOpen(!open)}>Cancel</Button>
              </div>
            </form>
          </div>
        )} arrow={mergedArrow} open={open}
          onOpenChange={(open) => setOpen(open)} trigger="click">
          <Button onClick={() => setOpen(!open)} style={{ width: 'auto', marginLeft: "28px",display:'flex' }}><PlusOutlined />{title}</Button>
        </Popover>

      </div>

    </ConfigProvider >
  );
};
export default Form;