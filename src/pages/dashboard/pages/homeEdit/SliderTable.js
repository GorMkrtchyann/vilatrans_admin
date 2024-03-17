import React, {useRef, useState} from 'react';
import HomeEditArea from "./HomeEditArea"
import axios from "axios";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CircularIndeterminate from "./Loader";
import Animations from "./allListsLoading";

function SliderTable(props) {
    const {allData, setAllData, deleteLoading, setDeleteLoading, allLoading} = props;

    const [openEdit, setOpenEdit] = useState(false);
    const [editSlide, setEditSlide] = useState({});

    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const [fileControl, setFileControl] = useState('');
    const [error, setError] = useState('');

    const getEditSlide = (id) => {
        setOpenEdit(true);
        const data = allData.find(elem => elem._id === id);
        setEditSlide(data);

        if (data.img.startsWith("data:image")) {
            setFileControl('image');
        } else {
            setFileControl('video');
        }
    }

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
                    fileInputRef.current.value = '';
                } else {
                    resolve(true);
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
                }
            };
            // videoRef.current.onerror = () => reject('Invalid video format or unable to load the video.');
        });
    };


    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        // For inputs with a single value
        if (name === 'link') {
            setEditSlide(prevState => ({
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
                    setFileControl('image');
                }
                // Validate video (if needed)
                if (file.type.startsWith('video/')) {
                    await validateVideo(file);
                    setFileControl('video');
                }

                setError('');

                // If validation passes, convert image to base64
                const image = await imageBase64(file);
                setEditSlide(prevState => ({
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
            setEditSlide(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    [lang]: value
                }
            }));
        }
    };

    const handleDelete = async (id, index) => {
        const deleteIndex = [...deleteLoading];
        deleteIndex[index] = false;
        setDeleteLoading(deleteIndex);

        const data = await axios.delete(`http://localhost:4000/home/slide-delete/${id}`);

        if (data) {
            setAllData(data.data);
            deleteIndex[index] = true;
            setDeleteLoading(deleteIndex);
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setOpenEdit(false);

        const data = await axios.put(`http://localhost:4000/home/slide-edit`, editSlide);
        if (data) {
            setAllData(data.data);
        }
    }

    return (
        <div className={'home-list'}>
            <table>
                <thead>
                {allData.length > 0 ? <tr className={'table-title'}>
                    <th>Image/Video</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Button Link</th>
                    <th>Editors</th>
                </tr> : null}
                </thead>
                <tbody>
                {allData.map((elem, index) => (
                    <tr key={elem._id} style={{height: '60px'}}>
                        <td>
                            {elem.img.startsWith("data:image") ?
                                <img className={'list-img'} src={elem.img} alt="img"/> :
                                <video src={elem.img} className={'list-img'} autoPlay={true}/>}
                        </td>
                        <td>{elem.title.en}</td>
                        <td>{elem.description.en}</td>
                        <td>{elem.link}</td>
                        <td className={'btn-td'}>
                            {deleteLoading[index] ?
                                <div onClick={() => handleDelete(elem._id, index)}>
                                    <DeleteOutlinedIcon fontSize={'medium'} style={{color: 'white'}}/>
                                </div> :
                                <div><CircularIndeterminate size={'10px'}/></div>}

                            <div onClick={() => getEditSlide(elem._id)}>
                                <EditOutlinedIcon fontSize={'medium'} style={{color: 'white'}}/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {openEdit ? <HomeEditArea setOpenEdit={setOpenEdit}
                                      editSlide={editSlide}
                                      setEditSlide={setEditSlide}
                                      handleChange={handleChange}
                                      handleEdit={handleEdit}
                                      fileInputRef={fileInputRef}
                                      videoRef={videoRef}
                                      fileControl={fileControl}
                                      error={error}/> : null}
        </div>
    );
}

export default SliderTable;