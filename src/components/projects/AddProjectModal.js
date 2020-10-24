import React, { useState } from 'react' 
import { styled } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import database from './../../database';
import Projects from './Projects'

const ModalStyled = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

const FadeStyled = styled('div')({
    background: "#fff",
    borderRadius: '5px',
    padding: "30px",
    minWidth: "320px",
    boxShadow: "0px 0px 20px #333"
});


const AddProjectModal = ({ addProjectModal, setAddProjectModal, GetProjects, setProjects, setLoading }) => {

    const [color, setColor] = useState(null)
    const [name, setName] = useState(null)

    const SaveProject = (e) => {
        e.preventDefault()
        const projectToAdd = {
            name: name,
            color: color
        }
        setProjects((projects) => [...projects, projectToAdd])
        setAddProjectModal(false);
        // Used with firebase connected
        // database
        //     .firestore()
        //     .collection('projects')
        //     .add(projectToAdd)
        //     .then( () => {
        //         setAddProjectModal(false);
        //         GetProjects(setProjects, setLoading);
        //     });
    }

    return (
        <ModalStyled 
            open={addProjectModal}
            onClose={() => setAddProjectModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500, }}
        >
            <FadeStyled>
                <h2>Add new project</h2>
                <form onSubmit={e => { SaveProject(e); }}>
                    <TextField
                        name="name"
                        label="Name"
                        id='name'
                        type="text"
                        onChange={e => { setName(e.target.value) }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        
                    />
                    <div />
                    <TextField
                        name="color"
                        label="Color"
                        id='color'
                        type="color"
                        onChange={e => { setColor(e.target.value) }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{marginTop: '30px', width: "50px"}}
                        
                    />
                    <div />
                    <Button variant="contained" type="submit" color="primary" style={{marginTop: '30px'}}>Save</Button>
                </form>
            </FadeStyled>
        </ModalStyled>
    );
}

export default AddProjectModal;