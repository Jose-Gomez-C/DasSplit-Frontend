import * as React from 'react'
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Numeral from "react-numeral";
import Typography from "@mui/material/Typography";


export const DetailsAccounting = ({
                                      idAccount,
                                      statement
                                  }) => {

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Información por usuario
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Usuario</TableCell>
                        <TableCell align="left">Gastos Totales</TableCell>
                        <TableCell align="left">Saldo a Favor</TableCell>
                        <TableCell align="left">Saldo por Pagar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {statement.map((user) => (
                        <TableRow key={idAccount}>
                            <TableCell align="left">{user.user}</TableCell>
                            <TableCell align="left"><Numeral value={user.debit} format={"$0,0.00"}/></TableCell>
                            <TableCell align="left"><Numeral value={user.balance > 0 ? user.balance : 0}
                                                             format={"$0,0.00"}/></TableCell>
                            <TableCell align="left"><Numeral
                                value={user.balance < 0 ? (user.balance * user.balance) ** 0.5 : 0} format={"$0,0.00"}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
