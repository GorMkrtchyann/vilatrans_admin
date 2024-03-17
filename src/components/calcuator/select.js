import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};


export default function MultipleSelectPlaceholder({ select, setSelect }) {



    function handleSelect(e) {
        const { value } = e.target
        const name = value.split(" ").pop().trim()
        setSelect({ name, value })
    }
    return (
        <div className="form__select mb-2 "  >
            <FormControl sx={{ width: '100%', borderColor: "#e2e2e2", mb: "20px" }}>
                <Select
                    sx={{
                        "&:focus": {
                            "&& .MuiOutlinedInput-notchedOutline": {
                                borderColor: '#e2e2e2',
                            }
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e2e2e2',
                        },
                        borderRadius: 0,
                        "&:hover": {
                            "&& fieldset": {
                                border: "1px solid #e2e2e2 !important"
                            }
                        }
                    }}
                    required
                    name={select.name || ''}
                    displayEmpty
                    input={<OutlinedInput required />}
                    renderValue={(selected) => {
                        // If 'selected' is empty, render placeholder
                        if (!selected) {
                            return <em >Select value</em>;
                        }
                        // Otherwise, render the selected value
                        return selected;
                    }}
                    MenuProps={MenuProps}
                    onChange={handleSelect}
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={select.value || ''}
                >
                    {/* Provide MenuItem options */}
                    <MenuItem disabled value="">
                        <em>Select value</em>
                    </MenuItem>

                    <MenuItem value='Country of origin'>Country of origin</MenuItem>
                    <MenuItem value='Country of delivery'>Country of delivery</MenuItem>
                    <MenuItem value='Type of service'>Type of service</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
