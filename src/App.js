import React, { useEffect, useState } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import database from './database'

const App = () => {

  // Get user 

  const [user, setUser] = useState({ name: "Test Account", role: 'admin', uid: "003344"});

  // Used with firebase connected
  // useEffect( () => {
  //   if (window.localStorage.getItem('email') && window.localStorage.getItem('password')) {
  //       database.auth().signInWithEmailAndPassword(window.localStorage.getItem('email'), window.localStorage.getItem('password'))
  //       .then( info => {
  //         setUser(database.auth().currentUser);
  //       })
  //         .catch(err => {
  //             console.error(err.message);
  //       });
  //   }
  // }, [])

  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            margin: '0',
            backgroundColor: '#eee'
          },
          h2: {
            textTransform: "uppercase",
            fontSize: "1.6rem!important",
            margin: '0!important'
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Dashboard user={user} />
      </div>
    </ThemeProvider>
  );
}

export default App;
