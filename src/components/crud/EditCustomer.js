import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import React, {useState} from 'react'
import EditIcon from '@material-ui/icons/Edit';

function EditCustomer(props){

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

    //Dialog open
    const handleClickOpen = () => {
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
            })
        setOpenDialog(true)
    }
    
    //Dialog close
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
        props.editCustomer(props.params.data.links[0].href, customer)
        handleClose()
    }

    return(
        <div>
        <EditIcon onClick={handleClickOpen}/>

            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Edit selected customer</DialogTitle>

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
                            type="email"
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
export default EditCustomer