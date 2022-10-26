import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApproveApplicationMutation, useRejectApplicationMutation } from "../redux/api";
import { useGetTokenQuery } from "../redux/api";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
}));

export default function ApplicationDetail() {
    const {
        data: tokenData,
        error: tokenError,
        isLoading: tokenLoading,
    } = useGetTokenQuery();
    const [isRescuer, setIsRescuer] = useState(false);
    const { applicationId } = useParams();
    const [application, setApplication] = useState(null)
    useEffect(() => {
        const url = `${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}/`;
        const fetchConfig = {
            method: 'get',
            credentials: "include",
        }
        fetch(url, fetchConfig)
            .then(res => res.json())
            .then(data => {
                setApplication(data);
                if (tokenData) {
                    setIsRescuer(tokenData.account.rescue_id === data.rescue_id);
                }
                else setIsRescuer(false)
            })
            .catch(e => console.error(e))
    }, [tokenData])

    const handleApprove = async () => {
        const approveUrl = `${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}/approve/`;
        const fetchConfig = {
            method: 'PATCH',
            credentials: "include",
        }
        const resp = await fetch(approveUrl, fetchConfig);
        if (resp.ok) {
            const data = await resp.json();
            setApplication(data);
        }
        else { console.error("fetch approve error") }
    }

    const handleReject = async () => {
        const approveUrl = `${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}/reject/`;
        const fetchConfig = {
            method: 'PATCH',
            credentials: "include",
        }
        const resp = await fetch(approveUrl, fetchConfig);
        if (resp.ok) {
            const data = await resp.json();
            setApplication(data);
        }
        else { console.error("fetch reject error") }
    };

    console.log(isRescuer);
    if (application)
        return (
            <Box sx={{ mt: 6 }}>
                <Typography variant='h2' align='center' >Application Detail</Typography>
                <Grid container sx={{ my: 2 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>First Name:</Typography>
                        <Item>{application.first_name}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Last Name:</Typography>
                        <Item>{application.last_name}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Phone Number:</Typography>
                        <Item>{application.phone_number}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Address:</Typography>
                        <Item>{application.address.address_one}</Item>
                        <Item>{application.address.address_two}</Item>
                        <Item>{`${application.address.city},${application.address.state},${application.address.zip_code}`}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Has Small Children?</Typography>
                        <Item>{application.has_small_children ? "yes" : "no"}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Has Dogs?</Typography>
                        <Item>{application.has_dogs ? "yes" : "no"}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Has Cats?</Typography>
                        <Item>{application.has_cats ? "yes" : "no"}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Smoke Free Home?</Typography>
                        <Item>{application.smoke_free_home ? "yes" : "no"}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Residence Type</Typography>
                        <Item>{application.residence_type}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Residence Ownerd?</Typography>
                        <Item>{application.residence_owned ? "yes" : "no"}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Landlord Restrictions:</Typography>
                        <Item>{application.landlord_restrictions}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Date Ready:</Typography>
                        <Item>{application.date_ready}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Wants Preapproval?</Typography>
                        <Item>{application.wants_preapproval ? "yes" : "no"}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Agrees to Terms?</Typography>
                        <Item>{application.agrees_to_terms ? "yes" : "no"}</Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <Typography>Status:</Typography>
                        <Item>{application.status}</Item>
                    </Grid>
                </Grid>
                {application.status === "Submitted" ?
                    <Box sx={{ my: 2, '& button': { m: 1 } }}>
                        <Button variant="contained" disabled={!isRescuer} color="success" onClick={handleApprove}>Approve</Button>
                        <Button variant="contained" disabled={!isRescuer} color="error" onClick={handleReject}>Reject</Button>
                        {!isRescuer ? <Typography color="error">Sorry, This Application is Not for Your Rescue!</Typography> : null}
                    </Box> :
                    <Typography sx={{ mt: 2 }} variant='h4' align='center'>This Application Has been {application.status}</Typography>
                }
            </Box >

        )

}
