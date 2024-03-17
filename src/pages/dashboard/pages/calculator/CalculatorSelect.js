import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MultipleSelectPlaceholder from '../../../../components/calcuator/select';
import { CircularProgress } from '@mui/material';
import { TableMap } from '../../../../components/calcuator/Table';
import CustomizedSnackbars from '../../../../components/calcuator/alert';
import { SelectInput } from '../../../../components/calcuator/SelectInput';

export const CalculatorSelect = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState({
    origin: false,
    servis: false,
    delivery: false
  })
  const [value, setValue] = useState({
    hy: "",
    en: "",
    ru: ""
  });
  const [data, setData] = useState(null);
  const [select, setSelect] = useState({
    name: '',
    value: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/dashboard/pages/calculator/select')
      .then(res => {
        setData(res.data.data[0]);
      })
      .catch(err => {
        setOpen({ openAlert: true, status: 'error', message: "Error please open console" });
        console.log(err);
      });
  }, []);

  async function handleDelete(e, name) {
    axios.delete(`http://localhost:8080/dashboard/pages/calculator/select?id=${data._id}&delets=${e}&name=${name}`)
      .then(res => {
        setData(res.data.data);
        setOpen({ openAlert: true, status: 'successfully', message: "Deleted successfully" } );

      })
      .catch(err => {
        setOpen({  openAlert: true, status: 'error', message: "Error please open console" });
        console.log(err);
      });
  }
  function handleShow(e) {
    const { name } = e.target
    setShow({ ...show, [name]: !show[name] })
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (value.hy.trim().length < 1 || value.en.trim().length < 1 || value.ru.trim().length < 1 || select.name.trim().length < 1) {
      return setOpen({  openAlert: true, status: 'error', message: "all fields are required" });

    }
    setLoading(true)
    axios.post('http://localhost:8080/dashboard/pages/calculator/select', { value, name: select.name, id: data._id })
      .then(res => {
        setOpen({  openAlert: true, status: 'successfully', message: "Added successfully" });
        setLoading(false)
        setData(res.data.data)
      })
      .catch(err => {
        setLoading(false)
        setOpen({  openAlert: true, status: 'error', message: "Error please open console"  });
        console.log(err);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div>
      {
        data ? <>
          <form onSubmit={handleSubmit} className='d-flex justidy-content-center flex-column align-items-center'>
            <div className='col-sm-12 col-md-7 col-lg-8  '>
              <MultipleSelectPlaceholder select={select} setSelect={setSelect} />
              <SelectInput value={value} handleChange={handleChange} />
              <input type='submit' className='button py-2 px-4 mt-3 mb-2' value='send' disabled={loading} />
              {loading && <CircularProgress className='mx-1 mt-1' size={24} />}
            </div>
          </form>
          <div className='row flex-column mt-5 justify-content-center gap align-items-start'>
            <button className='button px-4 py-2 w-25' onClick={handleShow} name='delivery'>{show.delivery ? 'hide' : 'show'} Delivert</button>
            {show.delivery && <table >
              <thead>
                <tr ><td colSpan='4'>Country of delivery</td></tr>
              </thead>
              <TableMap data={data.select.delivery} name={'delivery'} delets={handleDelete} />
            </table>}
            <button className='button px-4 py-2 w-25' onClick={handleShow} name='origin'>{show.origin ? 'hide' : 'show'} Origin</button>
            {show.origin && <table >
              <thead>
                <tr><td colSpan='4'>Country of origin</td></tr>
              </thead>
              <TableMap data={data.select.origin} name={'origin'} delets={handleDelete} />
            </table>}
            <button className='button px-4 py-2 w-25' onClick={handleShow} name='service'>{show.service ? 'hide ' : 'show'} Service</button>
            {show.service && <table >
              <thead>
                <tr><td colSpan='4'>Type of service</td></tr>
              </thead>
              <TableMap data={data.select.service} name='service' delets={handleDelete} />
            </table>}
            <CustomizedSnackbars open={open} setOpen={setOpen} />
          </div>
        </>
          : <div className='d-flex justify-content-center align-items-center '><CircularProgress /></div>}
    </div>
  )
}
