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
        console.log(params)
        const formatedDate = moment(params).format('llll')
        return(formatedDate)
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
              <div className="ag-theme-material" style={ {height:'700px', width:'80%', margin:'auto'} }>
              <AgGridReact 
                  ref={gridRef}

                  onGridReady={ p => 
                      {
                          gridRef.current = p.api
                      }
                  }
                  
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