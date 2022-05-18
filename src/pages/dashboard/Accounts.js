import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Title from './Title';
import Numeral from "react-numeral";
import {getAccounts} from "../../services/userServices";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import {useHistory} from "react-router";
import Button from "@mui/material/Button";
import {grey} from '@mui/material/colors';


const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export const Accounts = () => {
    const history = useHistory()
    const [accounts, setAccounts] = useState([]);
    const idUser = localStorage.getItem("idUser")
    useEffect(() => {
        async function getAllaccounts() {
            const account = await getAccounts(idUser)
            setAccounts(account);
        }

        getAllaccounts()
    }, [idUser])

    let balance = 0
    const rows = accounts
    const getStatement = (index) => {
        rows[index].statement.map((accounting) => {
            //
            if (accounting.user === idUser) {
                if (accounting.balance === 0) {
                    balance = 'No debes nada'
                } else {
                    if (accounting.balance > 0) {
                        balance = <Numeral value={accounting.balance} format={"$0,0.00"}/>
                    } else {
                        balance = <Numeral value={accounting.balance} format={"$0,0.00"}/>
                    }
                }
            }
        })
    }
    const moreDetails = (props) => () => {
        localStorage.setItem("idAccount", props)
        history.push('/detailsAccount')
    }

    return (<React.Fragment>
        <Title>Tus cuentas</Title>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Total de los gastos</TableCell>
                    <TableCell>Deuda actual</TableCell>
                    <TableCell>Favoritas</TableCell>
                    <TableCell>Detalle</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (<TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell><Numeral value={row.totalDebt} format={"$0,0.00"}/></TableCell>
                    {getStatement(index)}
                    <TableCell>{balance}</TableCell>
                    <TableCell>
                        <Checkbox {...label}
                                  icon={<FavoriteBorder/>}
                                  checkedIcon={<Favorite/>}
                                  checked={row.isFavorite}
                                  sx={{
                                      color: grey[700],
                                      '&.Mui-checked': {
                                          color: grey[700],
                                      },
                                  }}
                        />
                    </TableCell>
                    <TableCell>
                        <Button onClick={moreDetails(row.id)}
                                sx={{
                                    color: grey[700],
                                    '&.Mui-checked': {
                                        color: grey[700],
                                    },
                                }}>
                            <ContentPasteSearchIcon/>
                        </Button>
                    </TableCell>
                </TableRow>))}
            </TableBody>
        </Table>
    </React.Fragment>);
}