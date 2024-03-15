import React from 'react';
import {TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import OutlinedAlerts from "./ErrorAlert";

function HomeEditArea(props) {
    const {setOpenEdit, editSlide, fileInputRef, videoRef, fileControl, error} = props;
    const handleChange = props.handleChange;
    const handleEdit = props.handleEdit;

    return (
        <div className={'edit-area'}>
            <form onSubmit={handleEdit}>
                <div className={'close-icon'}>
                    <CloseIcon onClick={() => setOpenEdit(false)}/>
                </div>
                <div style={{border: 'none', marginTop: '20px'}}>
                    {error ? <OutlinedAlerts message={error}/> : null}
                </div>
                <label className={'col-inp img-lab'}>
                    Image dimensions must be 1920x1080.
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="img"
                        onChange={handleChange}
                        className={'img-inp'}
                    />
                    <div className={'upload-icon'}>
                        <CloudUploadOutlinedIcon/>
                        Upload Img
                    </div>
                    {editSlide.img !== '' && typeof editSlide.img === 'string' && fileControl === 'image' ? <img className={'edited-img'} src={editSlide.img} alt="img"/> : null }
                    <video  className={'video-area'}
                            src={editSlide.img}
                            ref={videoRef}
                            autoPlay={true}
                            width={250}
                            style={{display: fileControl === 'video' ? 'block' : 'none', margin: '50px 0 0 0'}}/>
                </label>

                <div>
                    <h6>Title</h6>
                    <TextField
                        name="title-en"
                        id="standard-basic"
                        label="English"
                        variant="standard"
                        required={true}
                        value={editSlide.title.en}
                        onChange={handleChange}
                        inputProps={{ maxLength: 50 }}
                    />

                    <TextField
                        name="title-ru"
                        id="standard-basic"
                        label="Russian"
                        variant="standard"
                        required={true}
                        value={editSlide.title.ru}
                        onChange={handleChange}
                        inputProps={{ maxLength: 50 }}
                    />

                    <TextField
                        name="title-am"
                        id="standard-basic"
                        label="Armenian"
                        variant="standard"
                        required={true}
                        value={editSlide.title.am}
                        onChange={handleChange}
                        inputProps={{ maxLength: 50 }}
                    />
                </div>

                <div>
                    <h6>Description</h6>
                    <TextField
                        name="description-en"
                        id="standard-basic"
                        multiline
                        rows={4}
                        label="English"
                        variant="standard"
                        required={true}
                        value={editSlide.description.en}
                        onChange={handleChange}
                        inputProps={{ maxLength: 150 }}
                    />

                    <TextField
                        name="description-ru"
                        id="standard-basic"
                        multiline
                        rows={4}
                        label="Russian"
                        variant="standard"
                        required={true}
                        value={editSlide.description.ru}
                        onChange={handleChange}
                        inputProps={{ maxLength: 150 }}
                    />

                    <TextField
                        name="description-am"
                        id="standard-basic"
                        multiline
                        rows={4}
                        label="Armenian"
                        variant="standard"
                        required={true}
                        value={editSlide.description.am}
                        onChange={handleChange}
                        inputProps={{ maxLength: 150 }}
                    />
                </div>

                <label className={'col-inp'}>
                    Button Link *
                    <TextField
                        name="link"
                        type="url"
                        id="standard-basic"
                        label=""
                        variant="standard"
                        required={true}
                        value={editSlide.link}
                        onChange={handleChange}
                    />
                </label>

                <button type={'submit'} className={'green-btn btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2'}>Save</button>
            </form>
        </div>
    );
}

export default HomeEditArea;