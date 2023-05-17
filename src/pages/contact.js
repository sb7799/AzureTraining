import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Stack, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function Contact() {
  const [locations, setLocations] = useState([]);
  const [selLocation, setSelLocation] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [searchLocation, setSearchLocation] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');

  const [users, setUsers] = useState();

  const baseUrl = "https://doctorsportal.azure-api.net";

  useEffect(() => {
    fetchLocations();
    fetchUsers();
  }, [])

  const handleLocationChange = (evt) => {
    const selLocation = evt;
    alert(evt.target.value)
    setSelLocation(selLocation);
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const fetchLocations = () => {
    fetch(baseUrl + "/api/locations")
      .then(response => {
        return response.json()
      })
      .then(data => {
        let locations = data.map(dt => {
          return {
            label: dt.city + ', ' + dt.state + ' (' + dt.country + ')',
            value: dt.locationId
          }
        });
        setLocations(locations)
      })
  }

  const fetchUsers = () => {
    fetch(baseUrl + "/api/UserMasters/GetUserMasters")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setUsers(data)
      })
  }

  const handleSearchLocation = (searchKeyword) => {
         setSearchKeyword(searchKeyword);
      fetch(baseUrl + '/api/UserMasters/GetUserSearchByKeyword/' + searchKeyword)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setUsers(data);
        })
    }
    const data1 = {
      from: "Link #1",
      message: "Welcome to KindaCode.com",
      timestamp: Date.now(),
    };
  return <div className="contact">
    <div>
      <InputLabel sx={{ marginLeft: 4 }}><h2>Find Doctors</h2></InputLabel>
    </div>
    <React.Fragment>

      <Stack spacing={2} direction="row" sx={{ marginBottom: 4, marginLeft: 20, marginRight: 20 }}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}></Stack>
        <FormControl fullWidth>
          <InputLabel id="lblUserTypes">Select Location</InputLabel><Select
            labelId="lblUserTypes"
            id="demo-simple-select"
            value={selLocation}
            label="Select Location"
            required
            fullWidth
            style={{ height: '57px' }}
            onChange={handleLocationChange}
          >
            {
              locations?.map((brand) => {
                return <MenuItem value={brand.value} key={brand.value}>{brand.label}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <TextField
          type="text"
          variant='outlined'
          color='secondary'
          label="Search doctors, by specification, by qualification"
          onChange={e => handleSearchLocation(e.target.value)}
          value={searchKeyword}
          fullWidth
          required
        />
      </Stack>
    </React.Fragment>
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={{ xs: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>

        {users && users.map((el, index) => (
          <Grid item xs={6} sm={6} md={6} key={index}>
            <Item>Full Name: {el?.firstName} {el?.middleName} {el?.lastName}</Item>
            <Item>Contact Number: {el?.contactNumber}</Item>
            <Item>Email: {el?.emailAddress}</Item>
            <Item>Qualification: {el?.qualification.qualification1}</Item>
            <Item>Spetialization: {el?.spetialization.spetialization1}</Item>
            <Item><small style={{ marginLeft:0}}>Schedule Appointment? <Link to="/bookappointment" state={data1}>Click Here</Link></small></Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  </div>
}
export default Contact;
