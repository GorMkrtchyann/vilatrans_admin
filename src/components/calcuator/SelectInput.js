import { TextField } from '@mui/material'
import React from 'react'

export const SelectInput = ({value, handleChange}) => {
  return (
    <>
     <p>Armenian</p>
              <TextField className='w-100' name='hy' value={value.hy || ''}
                required
                onChange={handleChange} id="outlined-basic" label="Text" variant="outlined" />
              <p>English</p>
              <TextField className='w-100' name='en' value={value.en || ''}
                required
                onChange={handleChange} id="outlined-basic" label="Text" variant="outlined" />
              <p>Russian</p>
              <TextField name='ru' className='w-100' value={value.ru || ''}
                required
                onChange={handleChange} id="outlined-basic" label="Text" variant="outlined" />
    </>
  )
}
