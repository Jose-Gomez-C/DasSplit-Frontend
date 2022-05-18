import * as React from 'react'
import {useEffect, useState} from 'react'

import {DetailsExpenses} from "./DetailsExpenses";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {createTheme, styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {MainListItems} from "../dashboard/listItems";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material";
import Paper from "@mui/material/Paper";
import {DetailsAccounting} from "./DetailsAccounting";
import {getAccount} from "../../services/userServices";
import {useHistory} from "react-router";
import Button from "@mui/material/Button";
import {grey} from "@mui/material/colors";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
const mdTheme = createTheme();


export const DetailsAccount = () => {
    const [open, setOpen] = useState(false);
    const history = useHistory()
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const idAccount = localStorage.getItem("idAccount")
    const modelAccount = {
        id: null,
        name: null,
        totalDebt: null,
        currentDebt: null,
        participants: [],
        accountings: [],
        statement: [],
        isFavorite: null
    }
    const [account, setAccount] = useState(modelAccount)
    useEffect(() => {
        async function getDataAccount() {
            const account = await getAccount(idAccount)
            setAccount(account)
        }

        getDataAccount()
    }, [idAccount])
    const onClickBack = () => {
        history.push('/dashboard')
    }
    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <CssBaseline/>
                <AppBar position="absolute" open={open} style={{backgroundColor: "black"}}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            DasSplit
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List component="nav">
                        <MainListItems/>
                        <Divider sx={{my: 1}}/>
                    </List>
                </Drawer>
                <Container component="main" maxWidth="sm" sx={{mb: 3}}>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                        <DetailsExpenses nameAccount={account.name} accountings={account.accountings}
                                         total={account.totalDebt}/>
                    </Paper>
                </Container>
                <Container component="main" maxWidth="md" sx={{mb: 3}}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <DetailsAccounting idAccount={account.id} statement={account.statement}/>
                    </Paper>
                </Container>
                <Container component="main" maxWidth="sm" sx={{mb: 3}}>
                    <Button  onClick={onClickBack}sx={{
                        color: grey[700],
                        '&.Mui-checked': {
                            color: grey[700],
                        },
                    }}> volver </Button>
                </Container>
            </ThemeProvider>
        </>
    )
}