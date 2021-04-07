import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LogIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const [nick, setNick] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
      axios.get("http://localhost:5000/admin/isAuth", {"headers": {"token": sessionStorage.getItem("token")}})
          .then(() => history.push("/admin"))
          .catch(() => null)
  }, [history])

  const handleLogin = () => {
      var data = {
          nick: nick,
          password: pwd
      }

      axios.post("http://localhost:5000/admin/signin", data)
          .then(res => {
              sessionStorage.setItem("token", res.data);
              history.push("/admin");
          })
          .catch(
              () => swal("Nickname o contraseña incorrectos", "", "error")
          )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nick"
            label="Nickname"
            name="nick"
            autoComplete="nick"
            autoFocus
            onChange={e => setNick(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPwd(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Conectarse
          </Button>
        </div>
      </div>
    </Container>
  );
}