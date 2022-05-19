import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Logo from '../../assets/logo/loguito.png'
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router";
import {createUser} from "../../services/userServices";


const theme = createTheme();

export const Register = () => {
    const history = useHistory()
    const {createUserWithEmailAndPassword} = useAuth()
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        let user = {
            "name": data.get('name'),
            "email": data.get('email'),
            "accounts": [],
            "friends": []

        }
        createUserWithEmailAndPassword(data.get('email'), data.get('password'))
            .then(() => {
                createUser(user)
                setTimeout(()=>{history.push('/dashboard')}, 500)
            }).catch(err => alert(err))


    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar alt="Logo" src={Logo} sx={{width: 250, height: 250}}/>
                    <Typography component="h1" variant="h5">
                        Registro
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombre"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Electronico"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="Contraseña"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Registrarme
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    ¿Ya tiene una cuenta? Iniciar sesión
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}