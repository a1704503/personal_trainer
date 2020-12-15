import React, {useState, useEffect, useRef} from 'react'
// import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import { AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import DeleteIcon from '@material-ui/icons/Delete'
import Link from '@material-ui/core/Link';

function Customerlist() {

    const [customers, setCustomers] = useState([])

    const getCustomers = () =>{
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(e => console.log(e))
    }

    const log = () =>{
        console.log("Logging")
    }

    //Quick Reset DB
    const resetDB = () => {
        if(window.confirm("Are you sure to reset DB?")){
            fetch("https://customerrest.herokuapp.com/reset", {method: "POST"})
            .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
            .catch(e => console.log(e))
        }
    }

    const columns = [
        {
            headerName: "",
            field: "_links.self.href",
            width: 90,
            cellRendererFramework: p => <Link onClick={log}><DeleteIcon/></Link>
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
            <div className="ag-theme-material" style={ {height:'700px', width:'85%', margin:'auto'} }>

                <AgGridReact 
                    ref={gridRef}

                    onGridReady={ p => 
                        {
                            gridRef.current = p.api
                        }
                    }
                    
                    suppressCellSelection={true}
                    columnDefs={columns} 
                    rowData={customers}
                    pagination="true"
                    paginationPageSize="8"
                >
                </AgGridReact>
            </div>
            <button onClick={resetDB}>Reset DB</button>
        </div>
    )
}

export default Customerlist