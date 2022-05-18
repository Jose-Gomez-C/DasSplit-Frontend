import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import {useAuth} from "../../contexts/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';


export const MainListItems = () => {
    const {signOut} = useAuth()
    return (
        <React.Fragment>
            <ListItemButton component="a" href="/dashboard">
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Inicio"/>
            </ListItemButton>
            <ListItemButton component="a" href="/newAccount">
                <ListItemIcon>
                    <CreateIcon/>
                </ListItemIcon>
                <ListItemText primary="Crear cuentas"/>
            </ListItemButton>
            <ListItemButton component="a" href="/" onClick={() => {
                signOut()
            }}>
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Salir"/>
            </ListItemButton>
        </React.Fragment>
    );
}
