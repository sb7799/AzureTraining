import { Typography } from "@material-ui/core";
import React, {useState} from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom"
import Stack from '@mui/material/Stack';


function Login() {
  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
 
      const handleSubmit = (event) => {
        event.preventDefault()
 
        setEmailError(false)
        setPasswordError(false)
 
        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }
 
        if (email==='shiri.bhagwan@hcl.com' && password==='123456') {
          sessionStorage.setItem('userName', 'BhagwanS')
            alert('you have to successfully logged in.')
        }
    }
  return ( <React.Fragment>
    <Stack spacing={2} direction="row" sx={{marginBottom: 4, marginLeft:45}}>
  <form autoComplete="off" onSubmit={handleSubmit} >
      <h2>Login Form</h2>
          <TextField 
              label="Email"
              onChange={e => setEmail(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="email"
              sx={{mb: 3}}
              fullWidth
              value={email}
              error={emailError}
           />
           <TextField 
              label="Password"
              onChange={e => setPassword(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={password}
              error={passwordError}
              fullWidth
              sx={{mb: 3}}
           />
           <Button variant="outlined" color="secondary" type="submit">Login</Button>
       
  </form>
  </Stack><small style={{ marginLeft:360}}>Need an account? <Link to="/registerform">Register here</Link></small>
  </React.Fragment>
);
}
export default Login;
