import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { styled } from '@material-ui/core';
import database from './../../database'


const FormStyled = styled('form')({
    maxWidth: "400px",
    margin: "0 auto",
    padding: '30px',
    marginTop: '100px',
    border: "1px solid grey",
    borderRadius: "6px",
    boxShadow: "10px 10px 20px #333",
    backgroundColor: "#fff"
  });

const Login = ({ setUser }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);

    const loginHandler = e => {
        e.preventDefault();
        if (!password || !login) {
            setError(true);
        } else {
            if (checked) {
                window.localStorage.setItem('email', login);
                window.localStorage.setItem('password', password);
            }
            database
                .auth()
                .signInWithEmailAndPassword(login, password)
                .then( () => {
                    setUser(database.auth().currentUser);
                })
                .catch(err => {
                    console.error(err.message);
                    setError(true);
                });
        }
      }



    return (
        <FormStyled onSubmit={ e => loginHandler(e) }>
            <TextField
                error={error && !login ? true : false}
                name='login'
                id="login"
                label="Email"
                type='text'
                onChange={ e => {
                    setLogin(e.target.value);
                    setError(false);
                    console.log(login);
                }}
                style={{ display: 'block' }}
            
            />
            <TextField
                error={error && !password ? true : false}
                name='password'
                id="password"
                label="Password"
                type="password"
                onChange={ e => {
                    setPassword(e.target.value);
                    setError(false);
                }}
                style={{ display: 'block' }}
                
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={ e => { setChecked(e.target.checked) } }
                        id="remember"
                        color="primary"
                        style={{ display: 'block' }}
                    />
                }
                label="Zapamiętaj mnie"
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                size="small"
                style={{ display: 'block' }}
            >
                Zaloguj
            </Button>
        </FormStyled>
    ); 
}

export default Login;