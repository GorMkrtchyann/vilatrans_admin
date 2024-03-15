import {IconCloudUpload} from "@tabler/icons-react";


export const FileUploadInput = ({ImageChange, inputRef}) => {


    return(
        <div className={'uploadFile'}>
            <IconCloudUpload />
            <p>Upload Image</p>
            <input type="file" onChange={(e) => ImageChange(e.target.files)} required
                   ref={inputRef}
            />
        </div>
    )
}