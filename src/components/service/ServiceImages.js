import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomizedSnackbars from '../calcuator/alert';

export const ServiceImg = ({ url, setData }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    async function alert(status, message) {
        setOpen({
            openAlert: true,
            status: status,
            message: message,
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            return alert("error", "Error please select an image file")

        }
        if (!selectedFile.type.startsWith('image/')) {
            return alert("error", "Fyle type not images")

        }

        const img = new Image();
        img.src = URL.createObjectURL(selectedFile);
        img.onload = () => {///onload is a Asynchronous function
            if (!(img.width === 471 && img.height === 401)) {
                return alert("error", "Image size must be max 471x401")
            } else {
                request(selectedFile)
            }
        };

    };

    async function request() {
        try {
            const imgData = await imgRender(selectedFile);
            setLoading(true)
            axios.patch(url, { images: imgData })
                .then(res => {
                    setLoading(false)
                    alert("successfully", "successfully images update")
                    setData(res.data.data)
                })
                .catch(error => {
                    setLoading(false)
                    alert("error", " Error request")
                    console.log(error)
                })

        } catch (error) {
            setLoading(false)
            alert("error", "Error")
            console.error(error);
        }
    }
    const imgRender = (file) => new Promise((resolve, reject) => {
        const render = new FileReader();
        render.onload = (event) => {
            resolve(event.target.result)
        };
        render.readAsDataURL(file)
    })


    return (
        <>
            <div>
                <p className='m-0'>Image max size 570x500</p>
                <form onSubmit={handleSubmit} >
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
                            Upload Image
                        </Button>
                        <span className='px-2 col-sm-12 text-wrap'>
                            {selectedFile ? selectedFile.name : 'File not selected'}
                        </span>
                    </label>
                    <Button type='submit' className='button' variant="contained">
                        {loading ? <CircularProgress size={24} /> : 'Send'}
                    </Button>
                </form>
            </div>
            {open && <CustomizedSnackbars open={open} setOpen={setOpen} />}
        </>

    );
};
