import React, { useMemo, useState } from 'react';
import { Button, ConfigProvider, Popover, Input, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { createSection } from '../../Api/Api'
import {Add_Section_Success}from '../../Store/Features/SectionSlice'

const { Item } = Form;

const text = <span>Title</span>;
const buttonWidth = 100;

const Sectionform = ({ projectId }) => {
    const [arrow, setArrow] = useState('Show');
    const [formVisible, setFormVisible] = useState(false);
    const [input, setinput] = useState('')
    const dispatch = useDispatch()
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



    const handleButtonClick = () => {
        setFormVisible(true);
    };

    const handleFormSubmit = (values) => {
        console.log('Form values:', values);
    };

    const handleinput = (e) => {
        // console.log(e.target.value);
        setinput(e.target.value)
    }

    const AddSection = async () => {
        const response = await createSection({ projectid: projectId, name: input })
        dispatch(Add_Section_Success(response))
        setFormVisible(false);
    }

    return (
        <ConfigProvider
            button={{
                style: {
                    width: buttonWidth,
                    margin: 4,
                },
            }}
        >
            <div className="demo">
                <div
                    style={{
                        clear: 'both',
                        whiteSpace: 'nowrap',

                    }}
                >
                    <Popover
                        overlayStyle={{ width: 250, padding: 16 }}
                        placement="bottomLeft"
                        title={text}
                        content={
                            formVisible && (

                                <Form onFinish={AddSection}>
                                    <Item label="Name" name="name" rules={[{ required: true, message: 'Please enter Title' }]}>
                                        <Input value={input} onChange={handleinput} />
                                    </Item>
                                    <Item>
                                        <Button type="primary" htmlType="submit">
                                            Add
                                        </Button>
                                    </Item>
                                </Form>

                            )
                        }
                        arrow={mergedArrow}
                        trigger="click"
                    >
                        <Button onClick={handleButtonClick}>Add Section</Button>
                    </Popover>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Sectionform;
