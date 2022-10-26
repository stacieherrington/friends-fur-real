import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Grid, Button } from '@mui/material';
import Copyright from '../components/Copyright';



export default function AddStaff(props) {
    const { email, setEmail, promoteStaff } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
        promoteStaff();
    }
    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography variant="h6">
                    Promote someone to Staff
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                label="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                helperText="Please enter staff email">
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: "#294C60" }} color="success" >
                        Promote
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 10 }} />
        </Container>
    )
}
