import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {InputAdornment, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import Button from "@mui/material/Button";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Numeral from "react-numeral";

export const ExpenseForm = () => {
    const [accounting, setAccounting] = React.useState({
        user: null,
        debit: null,
        balance: null
    });
    const participants = JSON.parse(localStorage.getItem("participants"))
    let accountings = JSON.parse(localStorage.getItem("accountings"))

    const handleChange = (props) => (event) => {
        setAccounting({...accounting, [props]: event.target.value});
    };
    const saveAccounting = () =>{

        accountings =[...accountings, accounting]
        localStorage.setItem("accountings",JSON.stringify(accountings))
        console.log(accountings)
        setAccounting({
            user: null,
            debit: "",
            credit: null,
            name: ""
        })
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Detalle de Gastos
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <InputLabel htmlFor="outlined-adornment-amount">Nombre del gasto</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={accounting.name}
                        onChange={handleChange('name')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        label="Amount"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="outlined-adornment-amount">cuanto fue el monto</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={accounting.debit}
                        onChange={handleChange('debit')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel id="demo-simple-select-label">¿Quien pago?</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="user"
                        value={accounting.user}
                        label="accounting"
                        onChange={handleChange("user")}
                        fullWidth
                    >
                        {participants.map((participant) => (
                            <MenuItem value={participant}>{participant}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    {accountings.map((object) =>(
                        <Grid item xs={12}>

                            {object.user} por un valor de <Numeral value = {object.debit} format={"$0,0.00"}/>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Button type="button" fullWidth variant="contained" endIcon={<AddBoxIcon />} onClick={saveAccounting}>
                        Añadir gasto
                    </Button>
                </Grid>
            </Grid>

        </React.Fragment>
    )
        ;
}