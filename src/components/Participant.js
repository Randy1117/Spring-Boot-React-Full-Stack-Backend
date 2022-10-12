import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),    
    },
  },
}));

export default function Participant() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[participants,setParticipants]=useState([])
     const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const participant={name,address}
    console.log(participant)
    fetch("http://localhost:8080/participant/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(participant)

  }).then(()=>{
    console.log("Nuevo participante añadido")
  })
}

useEffect(()=>{
  fetch("http://localhost:8080/participant/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setParticipants(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Agregar Participante</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Correo Electronico" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Guardar
</Button>
    </form>
   
    </Paper>
    <h1>Participantes</h1>

    <Paper elevation={3} style={paperStyle}>
      {participants.map(participant=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={participant.id}>
         Id:{participant.id}<br/>
         Nombre:{participant.name}<br/>
         Correo Electronico:{participant.address}
        </Paper>
      ))
}
    </Paper>
    </Container>
  );
}