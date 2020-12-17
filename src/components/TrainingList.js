import React, {useState, useEffect, useRef} from 'react'
import { AgGridReact} from 'ag-grid-react'
import {Snackbar} from '@material-ui/core'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'

function Traininglist() {

    const [trainings, setTrainings] = useState([])

    const [openState, setOpen] = useState(false)
    const [snackMsg, setSnackMsg] = useState("")

    //Training functions
    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(e => console.log(e))
    }

    const deleteTraining = (p) => {
        //console.log(p)
        if(window.confirm("Are you sure you want to delete selected training?")){
            fetch("https://customerrest.herokuapp.com/api/trainings/" + p, {method: "DELETE"})
            .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
            .then(_ => setSnackMsg("Training Deleted Succesfully!"))
            .then(_ => setOpen(true))
            .catch(e => console.log(e))
        }
    }

    //Quick Reset DB
    const resetDB = () => {
        if(window.confirm("Are you sure to reset the DB?")){
            fetch("https://customerrest.herokuapp.com/reset", {method: "POST"})
            .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
            .catch(e => console.log(e))
        }
    }

    //Date formatter
    const dateFormatter = (params) =>{
        const formatedDate = moment(params).format('llll')
        return(formatedDate)
    }
    
    //Name formatter
    const objectDestructurer = (params) => {
        let fullname = params.firstname + " " + params.lastname
        return (fullname)
    }

    //Quick Search
    const onFilterTextBoxChanged = (event) => {
        gridRef.current.setQuickFilter(event.target.value);
    }

    //Separate function for api access
    const onGridReady = (params) => {
        gridRef.current = params.api
    }

    //Snackbar
    const closeSnackbar = () =>{
        setOpen(false)
    }

    //Grid columns
    const columns = [
        
    {
        headerName: "",
        field: "links[0].href",
        width: 20,
        cellRendererFramework: p => <DeleteIcon onClick={() => deleteTraining(p.data.id)}/>
    },
    {
        headerName: "Date", 
        width: 300,
        field: "date",  
        sortable: true, 
        filter: true,
        valueFormatter: params => dateFormatter(params.value)
    },
    {   headerName: "Duration (min)", field: "duration", sortable: true, filter: true},
    {   headerName: "Activity",  field: "activity", sortable: true, filter: true},
    {
        headerName: "Customer", 
        width: 300,
        field: "firstname",
        sortable: true, 
        filter: true,
        valueFormatter: params => objectDestructurer(params.data.customer)
    }
        //getCustomerNames(params.data.links[2].href)
    ]

    useEffect(() => getTrainings(), [])

    const gridRef = useRef()
  

    return (
        <div>
              <div className="ag-theme-material" style={ {height:'700px', width:'85%', margin:'auto'} }>

              <label>Quick search</label><br/>
              <input onChange={onFilterTextBoxChanged}/>

              <AgGridReact 
                  ref={gridRef}
                  onGridReady={onGridReady}
                  suppressCellSelection={true}
                  columnDefs={columns} 
                  rowData={trainings}
                  pagination="true"
                  paginationPageSize="10"
              >
            
              </AgGridReact>

              <Snackbar
                        open={openState}
                        autoHideDuration={3000}
                        onClose={closeSnackbar}
                        message={snackMsg}
                    />

              <div><button onClick={resetDB}>Reset DB</button></div>

            </div>
        </div>
    )
}

export default Traininglist