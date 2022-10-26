import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApproveApplicationMutation, useRejectApplicationMutation } from "../redux/api";
import { useGetTokenQuery } from "../redux/api";
import PetsIcon from '@mui/icons-material/Pets';


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

    if (application)
        return (
          <Box sx={{ mt: 13 }}>
            <Typography variant='h2' align='center' sx={{ mb: 3 }} >Application Detail</Typography>
            <Item sx={{ backgroundColor: "#FFEFD3" }}>
                <Grid container sx={{ my: 2 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>First Name:</Typography>
                  {application.first_name}
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Last Name:</Typography>
                  {application.last_name}
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Phone Number:</Typography>
                  {application.phone_number}
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Address:</Typography>
                  <Typography>{application.address.address_one}</Typography>
                  <Typography>{application.address.address_two}</Typography>
                  <Typography>{`${application.address.city}, ${application.address.state}, ${application.address.zip_code}`}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Has Small Children?</Typography>
                  <Typography>{application.has_small_children ? "yes" : "no"}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Has Dogs?</Typography>
                  <Typography>{application.has_dogs ? "yes" : "no"}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Has Cats?</Typography>
                  <Typography>{application.has_cats ? "yes" : "no"}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Smoke Free Home?</Typography>
                  <Typography>{application.smoke_free_home ? "yes" : "no"}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Residence Type</Typography>
                  <Typography>{application.residence_type}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Residence Owned?</Typography>
                  <Typography>{application.residence_owned ? "yes" : "no"}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Landlord Restrictions:</Typography>
                  <Typography>{application.landlord_restrictions}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Date Ready:</Typography>
                  <Typography>{application.date_ready}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Wants Preapproval?</Typography>
                  <Typography>{application.wants_preapproval ? "yes" : "no"}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Agrees to Terms?</Typography>
                  <Typography>{application.agrees_to_terms ? "yes" : "no"}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                  <Typography sx={{ fontWeight: 'bold' }}>Status:</Typography>
                  <Typography>{application.status}</Typography>
                    </Grid>
              </Grid>
            </Item>
                {application.status === "Submitted" ?
                    <Box sx={{ my: 2, '& button': { m: 1 } }}>
                <Button disabled={!isRescuer} onClick={handleApprove}
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#294C60" }}
                  endIcon={<PetsIcon />}>Approve</Button>
                <Button variant="contained" disabled={!isRescuer} color="error" onClick={handleReject} endIcon={<PetsIcon />}>Reject</Button>
                        {!isRescuer ? <Typography color="error">Sorry, This Application is Not for Your Rescue!</Typography> : null}
                    </Box> :
                    <Typography sx={{ mt: 2 }} variant='h4' align='center'>This Application Has been {application.status}</Typography>
                }
            </Box >

        )

}
