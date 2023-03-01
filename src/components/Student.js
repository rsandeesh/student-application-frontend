import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, Paper} from "@mui/material";

export default function Student() {

    const paperStyle = {padding: '50px 20px', width: 600, margin: "20px auto"}
    const textFieldStyle = {width: 600, margin: "20px auto"}
    const headingStyle = {margin: "auto", color: "blue"}
    const [name, setName] = useState('');
    const [students, setStudents] = useState([]);
    const [address, setAddress] = useState('');
    const handleClick = (e) => {
        e.preventDefault()
        const student = {name, address}
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        }).then(() =>{
            console.log("New Student added")
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/get")
            .then(res => res.json())
            .then((result)=>{
            setStudents(result);
        })
    },[]);
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h1 style={headingStyle}><u>Add Student</u></h1>
                    <TextField id="standard-basic" label="Student Name" variant="standard" style={textFieldStyle}
                               value={name} onChange={(e) => setName(e.target.value)}/>
                    <TextField id="standard-basic" label="Student Address" variant="standard" style={textFieldStyle}
                               value={address} onChange={(e) => setAddress(e.target.value)}/>
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </Box>
            </Paper>
            {students.map(student => (
            <Paper elevation={6} style={{margin: "10px", padding: "15px", textAlign:"left"}} key={student.id}>
                Id: {student.id},
                Name: {student.name},
                Address: {student.address}
            </Paper>
            ))}
        </Container>
    );
}
