import React, {useState, useEffect, useRef} from 'react'
// import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import { AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import moment from 'moment';

function Traininglist() {

  const [trainings, setTrainings] = useState([])

    const getTrainings = () =>{
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(e => console.log(e))
    }

    const dateFormatter = (params) =>{
        const formatedDate = moment(params).format('llll')
        return(formatedDate)
    }

    const onFilterTextBoxChanged = (event) =>{
        gridRef.current.setQuickFilter(event.target.value);
    }

    const onGridReady = (params) => {
        gridRef.current = params.api
        //console.log(gridRef.current)
    }

    const columns = [
      {
        headerName: "Date", 
        width: 300,
        field: "date",  
        sortable: true, 
        filter: true,
        valueFormatter: params => dateFormatter(params.value)
      },
      {headerName: "Duration (min)", field: "duration", sortable: true, filter: true},
      {headerName: "Activity",  field: "activity", sortable: true, filter: true},
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
              
            </div>
        </div>
    )
}

export default Traininglist