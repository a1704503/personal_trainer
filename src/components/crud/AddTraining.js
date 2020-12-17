import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import React, {useState} from 'react'

function AddTraining(props){

    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: ""
        })

    const [openDialog, setOpenDialog] = useState(false)

    const handleInput = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

     //Dialog
    const handleClickOpen = () => {
        setTraining({...training, customer: props.params.data.links[0].href})
        setOpenDialog(true)
    }
    
    const handleClose = () => {
        setTraining({
        date: "",
        duration: "",
        activity: "",
        customer: ""
        })
        setOpenDialog(false)
    }

    const handleSave = () =>{
        props.addTraining(training)
        handleClose()
    }

    return(
        <div>

        <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add a Training
        </Button>

            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">New Training</DialogTitle>

                <DialogContent>

                        <TextField
                            id="datetime-local"
                            label="Next Training Session"
                            name="date"
                            type="datetime-local"
                            onChange={handleInput}
                            InputLabelProps={
                            {
                            shrink: true,
                            }
                        }
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="duration"
                            value={training.duration}
                            onChange={handleInput}
                            label="Duration (min)"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="activity"
                            value={training.activity}
                            onChange={handleInput}
                            label="Activity"
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
export default AddTraining