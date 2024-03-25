import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function StepsSelect({ selectSteps, setSelectSteps, handleClear }) {

    const handleChange = (SelectChangeEvent) => {
        setSelectSteps(SelectChangeEvent.target.value);
        handleClear()
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: '100%', marginBottom: '20px', paddingRight: '10px' }}>
            <InputLabel id="demo-simple-select-standard-label">Steps</InputLabel>
            <Select
                required
                defaultValue={'title'}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectSteps}
                onChange={handleChange}
                label="Text"
            >
                <MenuItem value={'one'}>1</MenuItem>
                <MenuItem value={'two'}>2</MenuItem>
                <MenuItem value={'three'}>3</MenuItem>
                <MenuItem value={'for'}>4</MenuItem>
            </Select>
        </FormControl>
    );
}
