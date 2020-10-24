import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { styled } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import AddProjectModal from './AddProjectModal'
import database from "../../database"

const ActionBtn = styled("span")({
   '&:hover' : {
       textDecoration: 'underline'
   },
   fontWeight: "bold",
   cursor: "pointer"
})

const RemoveProject = (id, setProjects, setLoading) => {
        // Used with firebase connected
        // database
        // .firestore()
        // .collection('projects')
        // .doc(id)
        // .delete()
        // .then(() => {
        //     GetProjects(setProjects, setLoading);
        // });
}

const GetProjects = (setProjects, setLoading) => {
    // Used with firebase connected
    // database
    // .firestore()
    // .collection('projects')
    // .get()
    // .then( res => {
    //     const id = res.docs.map( doc => doc.id);
    //     const data = res.docs.map( doc => doc.data());
    //     let merged = [];
    //     id.map((item, index) => {
    //       return merged.push({
    //         id: item,
    //         ...data[index]
    //       })
    //     });
    //     setProjects(merged);
    //     setLoading(false);       
    // })

    setLoading(false);
}

const Projects = () => {
    const [projects, setProjects] = useState([
        { id: 1, name: "Project One", color: "#34ff32" },
        { id: 2, name: "Project Two", color: "#340000" }
    ])
    const [loading, setLoading] = useState(true)
    const [addProjectModal, setAddProjectModal] = useState(false)

    useEffect(() => {
        GetProjects(setProjects, setLoading);
    },[])
    

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
                <Grid container>
                    <Grid item xs={11}><h2>Projects</h2></Grid>
                    <Grid item xs={1} style={{ display: 'flex', alignItems: "center", justifyContent: "flex-end"}}><AddCircleIcon onClick={() => setAddProjectModal(true)} style={{ margin: "0 5px"}} /></Grid>
                </Grid>
                 
                <Grid container style={{ padding: "10px", background: "#111", color: "#fff", fontWeight: "bold", marginTop: '15px' }}>
                        <Grid item xs={12} md={3}>Name</Grid>
                        <Grid item xs={12} md={4}>Color</Grid>
                        <Grid item xs={12} md={4}>Actions</Grid>
                </Grid>

                {projects.map(item => 
                    <Grid container key={item.id} style={{ borderBottom: "1px solid #333", padding: "5px 10px"}}>
                        <Grid item xs={12} md={3}>{item.name}</Grid>
                        <Grid item xs={12} md={4}><div style={{ background: item.color, width: 50, height: "100%"}}></div></Grid>
                        <Grid item xs={12} md={4}><ActionBtn onClick={() => RemoveProject(item.id, setProjects, setLoading)}>Delete</ActionBtn></Grid>
                    </Grid>
                )}
                <AddProjectModal projects={projects} addProjectModal={addProjectModal} setAddProjectModal={setAddProjectModal} GetProjects={GetProjects} setProjects={setProjects} setLoading={setLoading} />
            </div>
        )}
        </div>
    )
}

export default Projects;