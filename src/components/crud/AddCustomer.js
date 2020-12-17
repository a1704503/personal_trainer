import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import React, {useState} from 'react'

function AddCustomer(props){

    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
        })

    const [openDialog, setOpenDialog] = useState(false)

    const handleInput = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

     //Dialog
    const handleClickOpen = () => {
        setOpenDialog(true)
    }
    
    const handleClose = () => {
        setCustomer({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
        })
        setOpenDialog(false)
    }

    const handleSave = () =>{
        props.addCustomer(customer)
        handleClose()
    }

    return(
        <div>

        <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add a Customer
        </Button>

            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">New Customer</DialogTitle>

                <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            value={customer.firstname}
                            onChange={handleInput}
                            label="First Name"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="lastname"
                            value={customer.lastname}
                            onChange={handleInput}
                            label="Last Name"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="streetaddress"
                            value={customer.streetaddress}
                            onChange={handleInput}
                            label="Street Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="postcode"
                            value={customer.postcode}
                            onChange={handleInput}
                            label="Post Code"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="city"
                            value={customer.city}
                            onChange={handleInput}
                            label="City"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="email"
                            value={customer.email}
                            onChange={handleInput}
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="phone"
                            value={customer.phone}
                            onChange={handleInput}
                            label="Phone"
                            type="number"
                            fullWidth
                        />
                        
                    </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}
export default AddCustomer