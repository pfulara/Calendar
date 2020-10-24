import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Calendar from './../calendar/Calendar';
import Projects from './../projects/Projects';
import database from './../../database';

const Dashboard = ({ user }) => {

    const [projects, setProjects] = useState(null)

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

    const HeaderStyled = styled(Grid)({
        "& h1": {
            margin: '10px'
        },
        color: 'red',
        backgroundColor: "#111",
        height: "50px",
        display: "flex",
        alignItems: "center"
    })

    const MenuStyled = styled(Grid)({
        "& ul": {
            listStyle: "none",
            padding: '0'
        },
        "& .mainMenu li": {
            "&:hover": {
                paddingLeft: '5px',
                backgroundColor: "#222"
            },
            padding: '10px 0',
            transition: ".2s ease-in all"
        },
        "& a": {
            color: 'white',
            textDecoration: 'none',
            fontWeight: "600",
        },
        color: 'white',
        backgroundColor: "#111",
        padding: '15px 10px',
        minHeight: "calc(100vh - 50px)"
    })
    
    const ContentStyled = styled(Grid)({
        padding: '15px',
    })

    return (
        <Router>
            <Grid container>
                <HeaderStyled item xs={12}>
                    <h1>Caldendar</h1>
                </HeaderStyled>
                <MenuStyled item xs={2}>
                    <ul className="mainMenu">
                        <li>
                            <Link to='/'>Calendar</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                    </ul>
                    <ul>
                        {projects && projects.map(project =>
                            <li
                                key={project.id}
                                style={{
                                    display: 'flex',
                                    alignItems: "center"
                                }}
                            >
                                <div
                                    style={{
                                        width: 15,
                                        height: 15,
                                        borderRadius: "50%",
                                        background: project.color,
                                        marginRight: 10
                                    }}
                                />
                                {project.name}
                            </li>
                        )}
                    </ul>
                </MenuStyled>
                <ContentStyled item xs={10}>
                    <Switch>
                        <Route path='/projects'>
                            <Projects />
                        </Route>
                        <Route path='/'>
                            <Calendar user={user} />
                        </Route>
                    </Switch>
                </ContentStyled>
            </Grid>
        </Router>
    )
}

export default Dashboard;