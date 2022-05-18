import * as React from 'react';
import {useState} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Numeral from "react-numeral";
import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";


export default function Review() {
    let accountings = JSON.parse(localStorage.getItem("accountings"))
    const nameAccount = localStorage.getItem("nameAccount")
    const [checked, setChecked] = useState(false);
    localStorage.setItem("isFavorite", checked);
    let total = 0
    accountings.map((participants) => (
        total = total + Number(participants.debit)
    ))
    const handleChange = (event) => {
        setChecked(event.target.checked)
        localStorage.setItem("isFavorite", checked);
    }
    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                resumen de la cuenta:

            </Typography>
            <Typography variant="h6" gutterBottom>
                Nombre: {nameAccount}
            </Typography>
            <List disablePadding>
                {accountings.map((product) => (
                    <ListItem key={product.user} sx={{py: 1, px: 0}}>
                        <ListItemText primary={"El usuario "+product.user+ " con motivo " + product.name +" pago "}  secondary={product.desc} />
                        <Typography variant="body2"><Numeral value={product.debit} format={"$0,0.00"}/></Typography>
                    </ListItem>
                ))}

                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        <Numeral value={total} format={"$0,0.00"}/>
                    </Typography>
                </ListItem>
                <FormControlLabel
                    label='Marcar como favorita'
                    control={
                        <Checkbox
                            icon={<FavoriteBorder/>}
                            checkedIcon={<Favorite/>}
                            checked={checked}
                            onChange={handleChange}
                        />}
                />
            </List>
        </React.Fragment>
    );
}