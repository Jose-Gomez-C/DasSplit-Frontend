import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import {AddAccount} from './AddAccount';
import {ExpenseForm} from './ExpenseForm';
import Review from './Review';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {MainListItems} from "../dashboard/listItems";
import MuiDrawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import MuiAppBar from "@mui/material/AppBar";
import {createAccount} from "../../services/userServices";



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

const steps = ['Detalles de la cuenta', 'Registro de gastos', 'Revisión de la cuenta '];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddAccount/>;
        case 1:
            return <ExpenseForm/>;
        case 2:
            return <Review/>;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export const NewAccount = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);

    };
    const sendInfo = () => {
        setActiveStep(activeStep + 1);
        const accountings = JSON.parse(localStorage.getItem("accountings"))
        const participants = JSON.parse(localStorage.getItem("participants"))
        let total = 0
        const idUser = localStorage.getItem("idUser")
        accountings.map((participants) => (
            total = total + Number(participants.debit)
        ))
        let account = {
            name: localStorage.getItem("nameAccount"),
            "totalDebt": total,
            "currentDebt": null,
            "participants": participants,
            "accountings": accountings,
            "isFavorite": JSON.parse(localStorage.getItem("isFavorite"))
        }
        createAccount(idUser, account)
        localStorage.setItem("participants", JSON.stringify([idUser]))
        localStorage.setItem("accountings", JSON.stringify([]))


    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
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
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Crear Cuenta
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Cuenta creada
                                </Typography>
                                <Link href='/dashboard' underline="none">Ver mi balance</Link>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Volver
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={activeStep === steps.length - 1 ? sendInfo : handleNext}
                                        sx={{
                                            mt: 3, ml: 1,
                                        }}

                                    >
                                        {activeStep === steps.length - 1 ? 'Crear cuenta' : 'Siguente'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}