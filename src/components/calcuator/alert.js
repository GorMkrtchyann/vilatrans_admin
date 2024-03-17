import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const customSnackbarStyle = {
    position: 'fixed',
    left: '50%', 
    bottom: '15%', 
};

export default function CustomizedSnackbars({ open, setOpen }) {

    const handleClose = ( reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Snackbar open={open.openAlert} autoHideDuration={3000} onClose={handleClose} style={customSnackbarStyle}>
                {open.status === 'successfully'? <Alert onClose={handleClose} severity="success">
                    {open.message}
                </Alert> 
                   :open.status ==='error' && <Alert severity="error">{open.message}</Alert>}
            </Snackbar>
        </div>
    );
}
