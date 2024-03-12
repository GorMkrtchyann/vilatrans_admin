import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {SlideEdit} from "./SlideEdit";

const HomeEditContent = ({type}) => {
    const [element, setElement] = useState(null)

    useEffect(() => {
        switch (type.toLowerCase()) {
            case 'slider':
                return setElement(<SlideEdit/>)
        }
    }, [type])

    return(element)
}

export const HomeEdit = () => {
    const [type, setType] = useState('');

    return(
        <div style={{width: '100%'}}>
            <FormControl fullWidth style={{marginBottom: 20}}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={(event) => setType(event.target.value)}
                >
                    <MenuItem value={'slider'}>Slider</MenuItem>
                </Select>
            </FormControl>

            <HomeEditContent type={type}/>
        </div>
    )
}