import * as React from 'react';

import Title from './Title';

import {getUser} from "../../services/userServices";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";



export const Chart = () => {
    const modelUser = {
        name: null,
        email: null,
        accounts: [],
        friends: []
    }
    const [user, setUser] = useState(modelUser)
    const idUser = localStorage.getItem("idUser")
    useEffect(() => {
        async function getUserById() {
            const data = await getUser(idUser)
            setUser(data);
        }

        getUserById()
    }, [idUser])
    console.log(user)

    return (

        <React.Fragment>
            <Title>Bienvenido</Title>
            <Typography component="h2" variant="h3"  gutterBottom color="#212121">
                {user.name}
            </Typography>


        </React.Fragment>
    );
}