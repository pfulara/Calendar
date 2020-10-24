import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
});



const EventDetails = ({ singleEvent, setEventDetailsModal, eventDetailsModal, user, GetEvents, setEvents, setLoading }) => {

    const [edit, setEdit] = useState(false);
    const [newStart, setNewStart] = useState('');
    const [newEnd, setNewEnd] = useState('');
    const [projects, setProjects] = useState([
        { id: 1, name: "Project One", color: "#34ff32" },
        { id: 2, name: "Project Two", color: "#340000" }
    ])
    const [project, setProject] = useState('')

    useEffect(() => {
        setNewStart(singleEvent.startDate);
        setNewEnd(singleEvent.endDate);
    },[singleEvent])
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
    
    const RemoveEvent = () => {
        // Used with firebase connected
        // database
        //     .firestore()
        //     .collection('events')
        //     .doc(singleEvent.id)
        //     .delete()
        //     .then(() => {
        //         GetEvents(setEvents, setLoading)
        //         setEventDetailsModal(false)
        //     });
        setEventDetailsModal(false);
    }
    const EditEvent = () => {
        // Used with firebase connected
        // database
        //     .firestore()
        //     .collection('events')
        //     .doc(singleEvent.id)
        //     .set({
        //         title: singleEvent.title,
        //         content: singleEvent.content,
        //         start: newStart,
        //         end: newEnd,
        //         color: project
        //     })
        //     .then(() => {
        //         GetEvents(setEvents, setLoading)
        //         setEventDetailsModal(false)
        //     });
        setEventDetailsModal(false);
    }
    

    return (
        <ModalStyled
            open={eventDetailsModal}
            onClose={() => { 
                setEventDetailsModal(false);
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
        <FadeStyled in={eventDetailsModal}>
            <Card>
                <CardContent>
                    <h2>{singleEvent.title}</h2>
                    <p>{singleEvent.content}</p>
                    {edit ? (
                        <div>
                            <h3>Change date</h3>
                            <TextField
                                name="startDate"
                                label="Start"
                                id='startDate'
                                type="date"
                                onChange={ e => setNewStart(e.target.value) }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={singleEvent.startDate}
                            />
                            <TextField
                                name="endDate"
                                label="End"
                                id='endDate'
                                type="date"
                                onChange={ e => setNewEnd(e.target.value) }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={singleEvent.endDate}
                                style={{marginLeft: '30px'}}
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
                            <Button
                                style={{display: 'block', marginTop: '15px'}}
                                variant='contained'
                                color='primary'
                                size='small'
                                onClick={EditEvent}
                            >
                                Save
                            </Button>
                        </div>
                    ) : null}
                </CardContent>
                {user.role === 'admin' ? (
                <CardActions style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        size='small'
                        onClick={() => setEdit(!edit)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size='small'
                        onClick={RemoveEvent}
                    >
                        Delete
                    </Button>
                </CardActions>
                ) : null}
            </Card>
        </FadeStyled>
      </ModalStyled>
    );
}

export default EventDetails;