import React, {useState, useEffect, useRef} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Customerlist from './Customerlist'
import Traininglist from './TrainingList'
import Calendar from './Calendar'

function Tabcontrol() {

const [value, setValue] = useState('customer')

const handleChange = (event, value) => {
    setValue(value)
}
    
  return (
    <div >

        <AppBar position="relative">
            <Tabs value={value} onChange={handleChange}>
                <Tab value="customer"label="Customers"/>
                <Tab value="training"label="Trainings"/>
                <Tab value="calendar"label="Calendar"/>
            </Tabs>
        </ AppBar>

        {value === 'customer' && <div><Customerlist/></div>}
        {value === 'training' && <div><Traininglist/></div>}
        {value === 'calendar' && <div><Calendar/></div>}


    </div>
  )
}

export default Tabcontrol