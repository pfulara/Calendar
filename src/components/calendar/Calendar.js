import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import CircularProgress from '@material-ui/core/CircularProgress';

import database from "../../database";
import AddEventModal from '../addEventModal/AddEventModal';
import EventDetails from '../eventDetails/EventDetails';

const GetEvents = (setEvents, setLoading) => {
    // Used with firebase connected
    // database
    // .firestore()
    // .collection('events')
    // .get()
    // .then( querySnapshot => {
    //   const id = querySnapshot.docs.map( doc => doc.id);
    //   const data = querySnapshot.docs.map( doc => doc.data());
    //   let merged = [];
    //   id.map((item, index) => {
    //     return merged.push({
    //       id: item,
    //       ...data[index]
    //     })
    //   });
    //   setEvents(merged);
    //   setLoading(false);
    // })
    setLoading(false);
}


const Calendar = ({ user }) => {

  const [addEventModal, setAddEventModal] = useState(false);
  const [eventDetailsModal, setEventDetailsModal] = useState(false);
  const [selected, setSelected] = useState({ startDate: 0, endDate: 0 });
  const [events, setEvents] = useState([
    { id: 1, title: "test event", start: '2020-10-23', end: "2020-10-24", content: "This is test event", color: "#34ff32" }
  ]);
  const [loading, setLoading] = useState(true);
  const [singleEvent, setSingleEvent] = useState({ title: '', content: '', start: '', end: '' });


  useEffect(() => {
      GetEvents(setEvents, setLoading)
  }, []);

  return (
    <div>
    {loading ? (
      <div
        style={{ display: "flex", height: "90vh", justifyContent: "center", alignItems: 'center'}}
      >
        <CircularProgress />
      </div>
      ) : (
      <div>
        <AddEventModal
          events={events}
          setEvents={setEvents}
          addEventModal={addEventModal}
          setAddEventModal={setAddEventModal}
          selected={selected}
          setSelected={setSelected}
        />
        <EventDetails
          singleEvent={singleEvent}
          setEventDetailsModal={setEventDetailsModal}
          eventDetailsModal={eventDetailsModal}
          user={user}
          GetEvents={GetEvents}
          setEvents={setEvents}
          setLoading={setLoading}
        />
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          weekends={false}
          contentHeight='600px'
          locale='en'
          dayMaxEventRows={true}
          selectable={true}
          select = {info => {
            setSelected({ startDate: info.startStr, endDate: info.endStr });
          }}
          eventClick={ info => {
            setEventDetailsModal(true);
            setSingleEvent({ id: info.event.id, title: info.event.title, content: info.event.extendedProps.content, startDate: info.event.startStr, endDate: info.event.endStr });
          }}
          events={events}
          headerToolbar = {
            user.role === 'admin' ? (
            {
              right: 'prev,next addEvent',
            }) : (
              {
                right: 'prev,next',
              })
          }
          customButtons = {
            {
              'addEvent' : {
                'text' : "Add Event",
                'click': () => {
                  setAddEventModal(true);
                }
              }
            }
          }
        />
      </div>
    )}


    </div>
  );
}

export default Calendar;
