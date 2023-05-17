import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Container, Stack, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
//import DatePicker from "../component/datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const BookAppointment = (props) => {
  // const location = useLocation();
  // const state = location.state;
  //console.log(state);
  const { classes } = props;
  const baseUrl = "https://doctorsportal.azure-api.net/";
  const [users, setUsers] = useState();
  const [patientName, setPatientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [spetialization, setSpetialization] = useState('')
  const [selectedSpetializations, setSelectedSpetializations] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    fetchSpecifications();
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    fetch(baseUrl + "api/UserMasters/GetUserMasters")
      .then(response => {
        return response.json()
      })
      .then(data => {
        //console.log(data.map(x=>x.id==1));
        setUsers(data);
      })
  }

  const fetchSpecifications = () => {
    fetch(baseUrl + "api/UserMasters/GetUserSpetializations")
      .then(response => {
        return response.json()
      })
      .then(data => {
        const specification = data.map(dt => {
          return { 'value': dt.id, 'label': dt.spetialization1 }
        });
        setSpetialization(specification);
      })
  }

  const handleSpecification = (event) => {
    setSelectedSpetializations(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(patientName, value, startDate, email, contactNumber, selectedSpetializations)
    var payload = {
      "patientName": patientName,
      "patientContactNumber": contactNumber,
      "patientEmail": email,
      "bookingDateTime": value,
      "userId": 1,
      "specificationId": selectedSpetializations,
      "createdDate": new Date(),
    }

    fetch('https://doctorappoitment.azurewebsites.net/api/UserMasters/SaveAppointment', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(payload)
    }).then(data => {
      if (data) {
        alert("successfully saved data.");
      }
    })
  }


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return <Box>
    <Box sx={{ width: '100%' }}>
      <div style={{ textAlign: "center" }}>
        <InputLabel sx={{ marginLeft: 4 }}><h3> Book Appointment</h3></InputLabel>
      </div>
      <Grid container spacing={{ xs: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {users && users.slice(0, 1).map((el, index) => (
          <Grid item xs={6} sm={6} md={6} key={index}>
            <InputLabel sx={{ textAlign: 'center' }}><h4> Doctor Name {el?.firstName} {el?.middleName} {el?.lastName}</h4></InputLabel>
            <Item>Full Name: {el?.firstName} {el?.middleName} {el?.lastName}</Item>
            <Item>Contact Number: {el?.contactNumber}</Item>
            <Item>Email: {el?.emailAddress}</Item>
            <Item>Qualification: {el?.qualification.qualification1}</Item>
            <Item>Spetialization: {el?.spetialization.spetialization1}</Item>
          </Grid>
        ))}
        <Grid item xs={6} sm={6} md={6} >
          <InputLabel sx={{ marginLeft: 0 }}><h2>Register Form</h2></InputLabel>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4, marginLeft: 0 }}>
            <form style={{ width: "90%" }} onSubmit={handleSubmit} action={<Link to="/login" />}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Patient Name"
                  onChange={e => setPatientName(e.target.value)}
                  value={patientName}
                  fullWidth
                  required
                />
                <TextField
                  type="number"
                  variant='outlined'
                  color='secondary'
                  label="Contact Number"
                  onChange={e => setContactNumber(e.target.value)}
                  value={contactNumber}
                  required
                  fullWidth
                  sx={{ mb: 4 }}
                />
              </Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                <TextField
                  type="email"
                  variant='outlined'
                  color='secondary'
                  label="Email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  required
                  fullWidth
                  sx={{ mb: 4 }}
                />
                <FormControl fullWidth>
                  <InputLabel id="lblUserSpetialization">Disease</InputLabel><Select
                    labelId="lblUserSpetialization"
                    id="demo-simple-select"
                    value={selectedSpetializations}
                    label="Disease"
                    required
                    fullWidth
                    style={{ height: '57px' }}
                    onChange={handleSpecification}
                    defaultChecked={0}
                  >
                    {
                      spetialization && spetialization?.map((brand) => {
                        return <MenuItem value={brand.value} key={brand.label}>{brand.label}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                {/* <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  timeFormat="hh:mm"
                /> */}
                 <DateTimePicker onChange={onChange} min={new Date()} value={value} />
                {/* <DatePicker Date={startDate} onChange={}/> */}
                <Button style={{ "margin-left": "70px" }} variant="outlined" color="secondary" type="submit">Submit</Button>
              </Stack>
            </form>
          </Stack>
        </Grid>
      </Grid>
    </Box>

  </Box>
}


export default BookAppointment;