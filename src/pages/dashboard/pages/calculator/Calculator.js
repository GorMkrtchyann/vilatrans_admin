import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CalculatorImg } from '../calculator/CalculatorImg';
import '../../../../assets/styles/calculator.scss'
import { CalculatorSelect } from '../calculator/CalculatorSelect';

const CalculatorEditContent = ({ type }) => {
    const [element, setElement] = useState(null)

    useEffect(() => {
        switch (type.toLowerCase()) {
            case 'images':
                return setElement(<CalculatorImg />)
            case 'select':
                return setElement(<CalculatorSelect />)
        }
    }, [type])

    return (element)
}

export const Calculator = () => {


    const [type, setType] = useState('');

    return (
        <>
            <div style={{ width: '100%' }} className='calculator'>
                <FormControl fullWidth style={{ marginBottom: 20 }}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={(event) => setType(event.target.value)}
                    >
                        <MenuItem value={'Images'}>Images</MenuItem>
                        <MenuItem value={'Select'}>Select</MenuItem>
                    </Select>
                </FormControl>

                <CalculatorEditContent type={type} />
            </div>
        </>
    )
}

