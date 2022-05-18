import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Numeral from "react-numeral";
import {getAllCurretDebt} from "../../services/userServices";
import {useAuth} from "../../contexts/AuthContext";


export const Deposits = () => {
    let date = new Date().toLocaleDateString();
    const [totalDebt, setTotalDebt] = useState(0);
    const {currentUser} = useAuth()
    const idUser = currentUser.email
    useEffect(() => {
        async function getAllDebt() {
            const data = await getAllCurretDebt(idUser)
            setTotalDebt(data);
        }

        getAllDebt()
    }, [idUser])

    return (
        <React.Fragment>

            <Title color = "black">{totalDebt > 0 ? "En total te deben" : "En total debes"}</Title>
            {totalDebt === 0 ? <Typography component="p" variant="h5">Tu estado de cuenta esta en cero</Typography> :
                <Typography component="p" variant="h4">
                    <Numeral value={(totalDebt * totalDebt) ** 0.5} format={"$0,0.00"}/>
                </Typography>}

            <Typography color="text.secondary" sx={{flex: 1}}>
                {date}
            </Typography>
        </React.Fragment>
    );
}