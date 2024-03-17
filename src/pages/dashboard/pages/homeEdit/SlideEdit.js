import {TextField} from "@mui/material";
import SliderTable from "./SliderTable";
import '../../../../assets/styles/home.scss'
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CircularIndeterminate from "./Loader";
import OutlinedAlerts from "./ErrorAlert";


export const SlideEdit = () => {
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const [slideData, setSlideData] = useState({
        img: '',
        title: {
            am: '',
            ru: '',
            en: ''
        },
        description: {
            am: '',
            ru: '',
            en: ''
        },
        link: ''
    });

    const [error, setError] = useState('');

    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState([]);
    const [allLoading, setAllLoading] = useState(false);
    const [fileControll, setFileControll] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/home/slide-data').then(data => {
            setAllData(data.data);

            let deleteArr = [];
            for(let i = 0; i < data.data.length; i++) {
                deleteArr.push(true);
            }

            setDeleteLoading(deleteArr);

            if (data.data) {
                setAllLoading(true);
            }
        })
    }, [])

    const imageBase64 = async (file) => {
        const reader = new FileReader();
        await reader.readAsDataURL(file);
        const data = new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });

        return data
    }

    const validateImage = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = window.URL.createObjectURL(file);
            img.onload = () => {
                if (img.width !== 1920 || img.height !== 1080) {
                    setError('Image dimensions must be 1920x1080.');
                    fileInputRef.current.value = null;
                } else {
                    resolve(true);
                    setError('')
                }
            };
            // img.onerror = () => reject('Invalid image format or unable to load the image.');
        });
    };

    const validateVideo = (file) => {
        return new Promise((resolve, reject) => {

            videoRef.current.src = URL.createObjectURL(file);
            videoRef.current.onloadedmetadata = () => {
                if (videoRef.current.videoWidth !== 1920 || videoRef.current.videoHeight !== 1080) {
                    setError('Video dimensions must be 1920x1080.');
                    videoRef.current.src = null;
                } else {
                    resolve(true);
                    setError('')
                }
            };
            // videoRef.current.onerror = () => reject('Invalid video format or unable to load the video.');
        });
    };


    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        // For inputs with a single value
        if (name === 'link') {
            setSlideData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === 'img' && files.length > 0) {
            try {
                const file = files[0];

                // Validate file type (image)
                if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                    setError('Please select an image or video file.');
                    fileInputRef.current.value = null;
                    return;
                }

                // Validate image dimensions (for images)
                if (file.type.startsWith('image/')) {
                    await validateImage(file);
                    setFileControll('image');
                }
                // Validate video (if needed)
                if (file.type.startsWith('video/')) {
                    await validateVideo(file);
                    setFileControll('video');
                }

                setError('');

                // If validation passes, convert image to base64
                const image = await imageBase64(file);
                setSlideData(prevState => ({
                    ...prevState,
                    img: image
                }));
            } catch (error) {
                console.error("Error reading image:", error);
                alert(error); // Display error message
            }
        } else {
            // For inputs with nested values (title and description)
            const [key, lang] = name.split('-');
            setSlideData(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    [lang]: value
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSlideData({
            img: '',
            title: {
                am: '',
                ru: '',
                en: ''
            },
            description: {
                am: '',
                ru: '',
                en: ''
            },
            link: ''
        });

        setLoading(true);

        fileInputRef.current.value = null;

        const data = await axios.post('http://localhost:4000/home/slide', slideData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (data) {
            setAllData(data.data);
            setLoading(false);
            let deleteArr = [];
            for(let i = 0; i < data.data.length; i++) {
                deleteArr.push(true);
            }

            setDeleteLoading(deleteArr);
        }
    }

    return (
        <div className={'blockForm'}>
            <h3>Slider</h3>
            <div className={'blockForm__forms'}>
                <form onSubmit={handleSubmit}>
                    <div style={{border: 'none'}}>
                        {error ? <OutlinedAlerts message={error}/> : null}
                    </div>
                    <label className={'col-inp img-lab'}>
                        Image dimensions must be 1920x1080.
                        <input
                            ref={fileInputRef}
                            className={'img-inp'}
                            type="file"
                            name="img"
                            required={true}
                            onChange={handleChange}
                        />
                        <div className={'upload-icon'}>
                            <CloudUploadOutlinedIcon fontSize={'medium'} style={{color: 'white'}}/>
                            Upload Img
                        </div>
                        {slideData.img !== '' && typeof slideData.img === 'string' && fileControll === 'image' ? <img className={'slide-img'} src={slideData.img} alt="img"/> : null}
                        <video className={'video-area'} src={slideData.img} ref={videoRef} autoPlay={true} width={250} style={{display: fileControll === 'video' ? 'block' : 'none', margin: '50px 0 0 0'}}></video>
                    </label>

                    <div>
                        <h6>Title</h6>
                        <TextField
                            name="title-en"
                            onChange={handleChange}
                            id="standard-basic"
                            label="English"
                            variant="standard"
                            required={true}
                            value={slideData.title.en}
                            inputProps={{ maxLength: 60 }}
                        />

                        <TextField
                            name="title-ru"
                            onChange={handleChange}
                            id="standard-basic"
                            label="Russian"
                            variant="standard"
                            required={true}
                            value={slideData.title.ru}
                            inputProps={{ maxLength: 60 }}
                        />

                        <TextField
                            name="title-am"
                            onChange={handleChange}
                            id="standard-basic"
                            label="Armenian"
                            variant="standard"
                            required={true}
                            value={slideData.title.am}
                            inputProps={{ maxLength: 60 }}
                        />
                    </div>

                    <div>
                        <h6>Description</h6>
                        <TextField
                            name="description-en"
                            onChange={handleChange}
                            id="standard-basic"
                            multiline
                            rows={4}
                            label="English"
                            variant="standard"
                            required={true}
                            value={slideData.description.en}
                            inputProps={{ maxLength: 150 }}
                        />

                        <TextField
                            name="description-ru"
                            onChange={handleChange}
                            id="standard-basic"
                            multiline
                            rows={4}
                            label="Russian"
                            variant="standard"
                            required={true}
                            value={slideData.description.ru}
                            inputProps={{ maxLength: 150 }}
                        />

                        <TextField
                            name="description-am"
                            onChange={handleChange}
                            id="standard-basic"
                            multiline
                            rows={4}
                            label="Armenian"
                            variant="standard"
                            required={true}
                            value={slideData.description.am}
                            inputProps={{ maxLength: 150 }}
                        />
                    </div>

                    <label className={'col-inp'}>
                        Button Link *
                        <TextField
                            name="link"
                            onChange={handleChange}
                            type="url"
                            id="standard-basic"
                            label=""
                            variant="standard"
                            required={true}
                            value={slideData.link}
                        />
                    </label>

                    {!loading ?
                        <button type={'submit'} className={'green-btn btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2'}>Save</button> :
                        <button type={'button'} className={'green-btn btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2'}><CircularIndeterminate size={'30px'}/></button>}
                </form>
                <SliderTable allData={allData}
                             setAllData={setAllData}
                             deleteLoading={deleteLoading}
                             setDeleteLoading={setDeleteLoading}
                             allLoading={allLoading}/>
            </div>

        </div>
    )
}