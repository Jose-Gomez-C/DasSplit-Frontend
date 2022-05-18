import * as React from 'react'
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Numeral from "react-numeral";
export const DetailsExpenses = ({
                                    nameAccount,
                                    accountings,
                                    total
                                }) =>{
    return(
        <>
            <Typography variant="h4" gutterBottom>
                Gastos parciales
            </Typography>
            <Typography variant="h6" gutterBottom>
                Nombre de la cuenta: {nameAccount}
            </Typography>
            <List disablePadding>
                {accountings.map((product) => (
                    <ListItem key={product.user} sx={{py: 1, px: 0}}>
                        <ListItemText primary={"El usuario " + product.user + " pago:"} secondary={product.desc}/>
                        <Typography variant="body2"><Numeral value={product.debit} format={"$0,0.00"}/></Typography>
                    </ListItem>
                ))}

                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        <Numeral value={total} format={"$0,0.00"}/>
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}
