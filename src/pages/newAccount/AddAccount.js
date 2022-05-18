import * as React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from "@mui/material/Button";

import {getUserExists} from "../../services/userServices";

export const AddAccount = () => {

    let participants = JSON.parse(localStorage.getItem("participants"))
    const [Account, setAccount] = useState({
        nameAccount: '',
        nameParticipant: '',
        userExists: ''
    })


    const handleInputChange = (props) => (event) => {
        setAccount({
            ...Account,
            [props]: event.target.value
        })
        console.log(Account.nameAccount)
        if (Account.nameAccount !== undefined){
            localStorage.setItem("nameAccount", Account.nameAccount)
        }
    }


    const saveInformation = () => {
        getUserExists(Account.nameParticipant).then((userExists) => {
            localStorage.setItem("userExists", JSON.parse(userExists))
        })

        setTimeout(() =>{
            if (JSON.parse(localStorage.getItem("userExists"))) {
                participants = [...participants, Account.nameParticipant]
                localStorage.setItem("participants", JSON.stringify(participants))
                localStorage.setItem("accountings", JSON.stringify([]))
                setAccount({
                    nameParticipant: ""
                })
            } else {
                alert("Este usuario no existe")
                setAccount({
                    nameParticipant: "",
                    userExists: false
                })
            }
        }, 500)

    }
    const drawAccounts = (participant) =>{
        let answer = ""
        if (participant.participant === localStorage.getItem("idUser")){
            answer = "Tu ("+participant.participant+")"
        }else{
            answer = participant.participant
        }
        return answer
    }


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Informacion de la cuenta
            </Typography>
            <Box component="form" noValidate sx={{mt: 1}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="nameAccount"
                            name="nameAccount"
                            label="Nombre de la cuenta"
                            fullWidth
                            variant="standard"
                            onChange={handleInputChange("nameAccount")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="participants"
                            name="participants"
                            label="Ingresa el correo de los participantes"
                            value={Account.nameParticipant}
                            fullWidth
                            autoComplete="shipping address-line1"
                            onChange={handleInputChange("nameParticipant")}
                            variant="standard"></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button type="button" fullWidth variant="contained"
                                endIcon={<AddCircleIcon/>} onClick={saveInformation}>
                            Añadir
                        </Button>
                    </Grid>
                    <Grid item xs={12} >
                        {participants.map((participant) => (
                            <Grid item xs={6}>{drawAccounts({participant})}</Grid>
                        ))}
                    </Grid>

                </Grid>
            </Box>
        </React.Fragment>
    );
}