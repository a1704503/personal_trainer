import React, {useState, useEffect, useRef} from 'react'
import { AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCustomer from './crud/AddCustomer'
import {Snackbar} from '@material-ui/core'
import EditCustomer from './crud/EditCustomer'
import AddTraining from './crud/AddTraining'
// import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'

function Customerlist() {

    const [customers, setCustomers] = useState([])

    const [openState, setOpen] = useState(false)
    const [snackMsg, setSnackMsg] = useState("")

    //Customer functions
    const getCustomers = () =>{
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(e => console.log(e))
    }

    const addCustomer = (newCustomer) =>{
        fetch("https://customerrest.herokuapp.com/api/customers",
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
        .then(_ => setSnackMsg("Customer added succesfully!"))
        .then(_ => setOpen(true))
        .catch(e => console.log(e))
    }

    const editCustomer = (p, c) => {
        console.log("First argument: ", p)
        console.log("Second argument: ", c)
        fetch(p, 
        {
            method: "PUT",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(c)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
        .then(_ => setSnackMsg("Edit saved succesfully!"))
        .then(_ => setOpen(true))
        .catch(e => console.log(e))
    }

    const deleteCustomer = (p) => {
        console.log(p)
        if(window.confirm("Are you sure you want to delete selected customer?")){
            fetch(p, {method: "DELETE"})
            .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
            .then(_ => setSnackMsg("Customer Deleted Succesfully!"))
            .then(_ => setOpen(true))
            .catch(e => console.log(e))
        }
    }

    const addTraining = (training) => {
        console.log("First argument: ", training)
        fetch("https://customerrest.herokuapp.com/api/trainings/",
        {
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(training)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
        .then(_ => setSnackMsg("Training added succesfully!"))
        .then(_ => setOpen(true))
        .catch(e => console.log(e))
    }

    //Quick Reset DB
    const resetDB = () => {
        if(window.confirm("Are you sure to reset the DB?")){
            fetch("https://customerrest.herokuapp.com/reset", {method: "POST"})
            .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
            .catch(e => console.log(e))
        }
    }

    //Separate function for api access
    const onGridReady = (params) => {
        gridRef.current = params.api
    }

    //Quick Search
    const onFilterTextBoxChanged = (event) =>{
        gridRef.current.setQuickFilter(event.target.value)
    }

    //Snackbar
    const closeSnackbar = () =>{
        setOpen(false)
    }

    const columns = [
        {
            headerName: "",
            field: "links[0].href",
            width: 5,
            cellRendererFramework: p => <EditCustomer editCustomer={editCustomer} params={p}/>

        },
        {
            headerName: "",
            field: "links[0].href",
            width: 5,
            cellRendererFramework: p => <DeleteIcon onClick={() => deleteCustomer(p.data.links[0].href)}/>
        },
        {
            headerName: "Actions",
            field: "links[0].href",
            width: 225,
           cellRendererFramework: p => <AddTraining addTraining={addTraining} params={p}/>
        },
        {headerName: "First Name", field: "firstname", sortable: true, filter: true},
        {headerName: "Last Name", field: "lastname", sortable: true, filter: true},
        {headerName: "Street adress", field: "streetaddress", sortable: true, filter: true},
        {headerName: "Postalcode", field: "postcode", sortable: true, filter: true},
        {headerName: "City", field: "city", sortable: true, filter: true},
        {headerName: "Email", field: "email", sortable: true, filter: true},
        {headerName: "Phone", field: "phone", sortable: true, filter: true}
    ]

    useEffect(() => getCustomers(), [])
    const gridRef = useRef()


    return (
        <div>
            <div className="ag-theme-material" style={ {height:'700px', width:'95%', margin:'auto'} }>

            <label>Quick search</label><br/>
            <input onChange={onFilterTextBoxChanged}/>
            
            <div>
            <br/>
                <AddCustomer addCustomer={addCustomer}/>
            </div>

                <AgGridReact 
                    ref={gridRef}

                    onGridReady={onGridReady}
                    suppressCellSelection={true}
                    columnDefs={columns} 
                    rowData={customers}
                    pagination="true"
                    paginationPageSize="8"
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

    // console.log(p.data.links[0].href)

    // const getSelectedRowData = () => {
    //     let selectedNodes = gridRef.current.getSelectedNodes()
    //     let selectedData = selectedNodes.map(node => node.data)
    //     alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`)
    //     <button onClick={getSelectedRowData} style={{margin: 10}}> Get Selected Nodes</button>
    //     return selectedData
    //   }
}

export default Customerlist