import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Stack, InputLabel, FormControl, Select, MenuItem,Box, AlertTitle } from '@mui/material';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [spetialization, setSpetialization] = useState('')
    const [userTypes, setUserTypes] = useState(null)
    const [selectedUserType, setSelectedUserType] = useState('')
    const [qualifications, setQualifications] = useState('')
    const [selectedQualifications, setSelectedQualifications] = useState('')
    const [spetializations, setSpetializations] = useState('')
    const [selectedSpetializations, setSelectedSpetializations] = useState('')
    const [password, setPassword] = useState('')
    const baseUrl = "https://doctorsportal.azure-api.net/";

    useEffect(() => {
        fetchTypes();
        fetchQualificaitons();
        fetchSpecifications();
    }, [])


    const fetchTypes = () => {
        fetch(baseUrl + "api/UserMasters/GetUserTypes")
            .then(response => {
                return response.json()
            })
            .then(data => {
                // const userTypes = data.map(dt => {
                //     return { 'value': dt.userTypeId, 'label': dt.userTypeName }
                // });
                setUserTypes(data);
            })
    }

    const fetchQualificaitons = () => {
        fetch(baseUrl + "api/UserMasters/GetUserQualifications")
            .then(response => {
                return response.json()
            })
            .then(data => {
                const qualification = data.map(dt => {
                    return { 'value': dt.id, 'label': dt.qualification1 }
                });
                setQualifications(qualification);
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


    const handleUserTypes = (event) => {
        <Alert severity="success" >
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
        setSelectedUserType(event.target.value);
    };
    const handleQualification = (event) => {
        setSelectedQualifications(event.target.value);
    };
    const handleSpecification = (event) => {
        setSelectedSpetializations(event.target.value);
    };

    const getPCMenuItems = () => {

        return userTypes.map(pcData => {

            return <MenuItem value={pcData.userTypeId}>{pcData.userTypeName}</MenuItem>

        })



    }


    function handleSubmit(event) {
        console.log(firstName, lastName, email, contactNumber, password, selectedQualifications, selectedSpetializations, selectedUserType)
        var payload = {
            "userName": firstName + '.' + lastName,
            "firstName": firstName,
            "middleName": '',
            "lastName": lastName,
            "emailAddress": email,
            "password": password,
            "contactNumber": contactNumber,
            "userTypeId": selectedUserType,
            "qualificationId": selectedQualifications,
            "spetializationId": selectedSpetializations,
            "active": true,

        }
        event.preventDefault();
        fetch('https://doctorappoitment.azurewebsites.net/api/UserMasters', {
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

    return (
        <React.Fragment>
            <InputLabel sx={{ marginLeft: 35 }}><h2>Register Form</h2></InputLabel>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4, marginLeft: 35 }}>
                <form style={{ width: "75%" }} onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="First Name"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            fullWidth
                            required
                        /></Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel id="lblUserTypes">User Types</InputLabel><Select
                                labelId="lblUserTypes"
                                id="demo-simple-select"
                                value={selectedUserType}
                                label="User Types"
                                required
                                fullWidth
                                style={{ height: '57px' }}
                                onChange={handleUserTypes}
                            >
                                {
                                    userTypes?.map((brand) => {
                                        return <MenuItem value={brand.userTypeId} key={brand.userTypeId}>{brand.userTypeName}</MenuItem>
                                    })

                                }
                            </Select>
                        </FormControl>
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
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel id="lblQualification">Qualification</InputLabel>
                            <Select
                                labelId="lblQualification"
                                id="demo-simple-select"
                                value={selectedQualifications}
                                label="Qualification"
                                required
                                fullWidth
                                style={{ height: '57px' }}
                                onChange={handleQualification}
                                defaultChecked={0}
                            >
                                {
                                    qualifications && qualifications?.map((brand) => {
                                        return <MenuItem value={brand.value} key={brand.label}>{brand.label}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="lblUserSpetialization">Spetialization</InputLabel><Select
                                labelId="lblUserSpetialization"
                                id="demo-simple-select"
                                value={selectedSpetializations}
                                label="Spetialization"
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
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 0 }}>
                        <TextField
                            type="password"
                            variant='outlined'
                            color='secondary'
                            label="Password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
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

                    </Stack>

                    {/* <TextField
                        type="date"
                        variant='outlined'
                        color='secondary'
                        label="Date of Birth"
                        onChange={e => setDateOfBirth(e.target.value)}
                        value={dateOfBirth}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    /> */}
                    <Button variant="outlined" color="secondary" type="submit">Register</Button>
                </form>
            </Stack>
            <small style={{ marginLeft: 280 }}>Already have an account? <Link to="/login">Login Here</Link></small>

        </React.Fragment>
    )
}

export default RegisterForm;