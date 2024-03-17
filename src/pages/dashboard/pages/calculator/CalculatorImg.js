import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomizedSnackbars from '../../../../components/calcuator/alert';

export const CalculatorImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [data, setData] = useState(null)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/dashboard/pages/calculator/img')
            .then(res => setData(res.data.data[0]))
            .catch(err => console.log(err))
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            return setOpen({
                openAlert: true,
                status: 'error',
                message: 'Error please select an image file'
            })

        }
        if (!selectedFile.type.startsWith('image/')) {
            return setOpen({       
                    openAlert: true,
                    status: 'error',
                    message: 'Error please select an image file'
                
            })

        }

        const img = new Image();
        img.src = URL.createObjectURL(selectedFile);
        img.onload = () => {
            if (img.width !== 1930 || img.height !== 1080) {
                return setOpen({
                    openAlert: true,
                    status: 'error',
                    message: 'Image size must be 1930x1080'
                })
            }
        };
        setLoading(true)
        try {
            const imgData = await imgRender(selectedFile);
            axios.patch('http://localhost:8080/dashboard/pages/calculator/img', { images: imgData, id: data._id })
                .then(res => {
                    setLoading(false)
                    setOpen({
                            openAlert: true,
                            status: 'successfully',
                            message: 'successfully'
                    })
                    setData(res.data.data)
                })
                .catch(res => {
                    setLoading(false)
                    setOpen({
                            openAlert: true,
                            status: 'error',
                            message: 'Error please open console'
                    })
                    console.log(res)
                })
        } catch (error) {
            setLoading(false)
            setOpen({
                    openAlert: true,
                    status: 'error',
                    message: 'Error please open console'
                
            })
            console.error(error);
        }

    };


    const imgRender = (file) => new Promise((resolve, reject) => {
        const render = new FileReader();
        render.onload = (event) => {
            resolve(event.target.result)
        };
        render.readAsDataURL(file)
    })


    return (
        <>{
            data ? <div className='d-flex justify-content-center align-items-center wrap'>
                <div className=' p-3 col-sm-12 col-md-5 '>
                    <h1 className='mt-9 mb-3'>Select Image</h1>
                    <p className='d-block'>Image size 1930x1080</p>
                    <form className='mt-9 d-flex wrap gap align-items-center' onSubmit={handleSubmit} >
                        <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="fileInput"
                        />
                        <label htmlFor="fileInput">
                            <Button component="span" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload file
                            </Button>
                            <span className='px-2 col-sm-12 text-wrap'>
                                {selectedFile ? selectedFile.name : 'File not selected'}
                            </span>
                        </label>
                        <input type='submit' value='Send' className='py-2 px-4 mt-3 mb-3 button' disabled={loading ? true : false} />
                        {loading && <CircularProgress size={24} />}
                    </form>
                </div>
                <div className='col-sm-12 col-md-6 p-2 '>
                    <p className='imageText'>installed</p>
                    <img src={data.images} className='w-100' alt='calculator img' />
                </div>
                <CustomizedSnackbars open={open} setOpen={setOpen} />
            </div> : <div className='d-flex justify-content-center align-items-center '><CircularProgress /></div>

        }</>


    );
};
