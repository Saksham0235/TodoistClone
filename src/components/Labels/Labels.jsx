import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { getLabels, deleteLabel, createLabel } from '../../Api/Api'
import { LoadingOutlined, TagOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { fetchLabelSuccess, deleteLabelSuccess, addLabelSuccess } from '../../Store/Features/LabelsSlice'
import { useSnackbar } from 'notistack';
import Form from '../Sidebar/ProjectForm';
import { Link, useNavigate } from 'react-router-dom';


function Labels() {
    const data = useSelector((state) => state.Label.Labels)
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchlabels = async () => {
        try {
            const response = await getLabels()
            dispatch(fetchLabelSuccess(response))
            setLoading(false);
            enqueueSnackbar("Fetched Labels", { variant: 'success' })
        }
        catch (err) {
            enqueueSnackbar("Error in Fetching Labels", { variant: 'error' })
        }
    }



    const HandleDelete = async (id) => {
        console.log(id, "Delete")
        try {
            const response = await deleteLabel(id)
            dispatch(deleteLabelSuccess(id))
        }
        catch (err) {
            console.log("Error in deleting label: ", err);
        }
    }

    const AddLabel = async (name) => {
        try {
            const response = await createLabel(name)
            dispatch(addLabelSuccess(response))
            navigate(`/app/label/${name}`)
        }
        catch (err) {
            console.log('Error creating label', err);
        }
    }


    useEffect(() => {
        fetchlabels()
    }, [])
    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Labels <Form title='Add Label' handleAdd={AddLabel} /></h1>
            <center><Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></center>
            {data.map((label) => {
                return (
                    <ul key={label.id} style={{ listStyle: 'none' }}>
                        <li style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', width: 780 }}>
                            <div key={label.id} className="div" style={{ display: "flex", flexDirection: 'column', cursor: 'pointer' }}>

                                <Link to={`/app/label/${label.name}-${label.id}`} style={{textDecoration:'none'}}>
                                <span><TagOutlined style={{marginRight:10}} />
                                    {label.name}
                                </span>
                                </Link>

                            </div>
                            <div className="buttons" style={{ width: 100, display: 'flex', justifyContent: 'space-between' }}>
                                <Button danger onClick={() => HandleDelete(label.id)}>Delete</Button>
                            </div>

                        </li>

                    </ul>
                )
            })}
        </div>
    )
}

export default Labels
