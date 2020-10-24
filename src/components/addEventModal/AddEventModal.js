import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import database from "../../database";


const ModalStyled = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

const FadeStyled = styled(Fade)({
    background: "#fff",
    borderRadius: '5px',
    padding: "30px",
    minWidth: "320px",
    boxShadow: "0px 0px 20px #333"
})


const AddEventModal = ({ events, setEvents, addEventModal, setAddEventModal, selected, setSelected }) => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [project, setProject] = useState('')
    const [projects, setProjects] = useState([
        { id: 1, name: "Project One", color: "#34ff32" },
        { id: 2, name: "Project Two", color: "#340000" }
    ])

    // Used with firebase connected
    // useEffect(() => {
    //     database
    //     .firestore()
    //     .collection('projects')
    //     .get()
    //     .then( res => {
    //         const id = res.docs.map( doc => doc.id);
    //         const data = res.docs.map( doc => doc.data());
    //         let merged = [];
    //         id.map((item, index) => {
    //           return merged.push({
    //             id: item,
    //             ...data[index]
    //           })
    //         });
    //         setProjects(merged);   
    //     })
    // },[])

    const SaveEvent = (e) => {
        e.preventDefault();

        const eventToAdd = {
            title: title,
            content: content,
            start: selected.startDate,
            end: selected.endDate,
            color: project
        }

        setEvents(events => [...events, eventToAdd]);
        setAddEventModal(false);
        // Used with firebase connected
        // database
        //     .firestore()
        //     .collection('events')
        //     .add(eventToAdd)
        //     .then( (event) => {
        //         setAddEventModal(false);
        //         const newEvent = [{
        //                 id: event.id,
        //                 ...eventToAdd
        //             },
        //             ...events
        //         ];
        //         setEvents(newEvent);
        //     });
    }

    return (
        <ModalStyled
            open={addEventModal}
            onClose={() => { 
                setAddEventModal(false);
                setSelected({ startDate: 0, endDate: 0 });
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
        <FadeStyled in={addEventModal}>
          <form onSubmit={(e) => {
              SaveEvent(e);
          }}>
            <h2>Add Event</h2>
            <TextField
                name="startDate"
                label="Start"
                id='startDate'
                type="date"
                onChange={ e => setSelected({ startDate: e.target.value, endDate: selected.endDate }) }
                InputLabelProps={{
                    shrink: true,
                  }}
                defaultValue={selected.startDate}
            />
            <TextField
                name="endDate"
                label="End"
                id='endDate'
                type="date"
                onChange={ e => setSelected({ endDate: e.target.value, startDate: selected.startDate }) }
                InputLabelProps={{
                    shrink: true,
                  }}
                defaultValue={selected.endDate}
                style={{marginLeft: '30px'}}
            />
            <div />
            <InputLabel style={{ marginTop: "30px", width: "100%" }} id="tytul">Name</InputLabel>
            <TextField 
                style={{ width: "100%" }}
                name="tytul"
                labelId="tytul"
                onChange={ e => setTitle(e.target.value) }
                InputLabelProps={{
                    shrink: true,
                  }}
            />
            <div />
            <InputLabel style={{ marginTop: "30px", width: "100%" }} id="project">Project</InputLabel>
            <Select
                style={{ width: "100%" }}
                labeld="project"
                name='project'
                value={project}
                onChange={e => setProject(e.target.value)}
                >
                {projects && projects.map(item => <MenuItem key={item.id} value={item.color}>{item.name}</MenuItem>)}
            </Select>
            <div />
            <InputLabel style={{ marginTop: "30px", width: "100%" }} id="opis">Description</InputLabel>
            <TextareaAutosize
                labeld="opis"
                name='opis'
                style={{ width: "100%" }}
                rowsMin={4}
                onChange={ e => setContent(e.target.value) }
            > 
            </TextareaAutosize>
            <div />
            <Button variant="contained" type="submit" color="primary" style={{marginTop: '30px'}}>Save</Button>
          </form>
        </FadeStyled>
      </ModalStyled>
    );
}

export default AddEventModal;