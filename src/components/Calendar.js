import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

function Calendar() {

    return (
        <div>
            <FullCalendar
            plugins={[ 
                dayGridPlugin,
                timeGridPlugin
            ]}
            events={{url: "https://customerrest.herokuapp.com/gettrainings"}}
            headerToolbar={{center: "dayGridMonth,timeGridWeek,timeGridDay"}}
            initialView="dayGridMonth"
            />
        </div>
    )
  }
  
export default Calendar