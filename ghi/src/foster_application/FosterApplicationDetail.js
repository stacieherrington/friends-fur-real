import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetTokenQuery } from "../redux/api";
import PetsIcon from "@mui/icons-material/Pets";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
}));

export default function FosterApplicationDetail() {
  const { data: tokenData } = useGetTokenQuery();
  const [isRescuer, setIsRescuer] = useState(false);
  const { fosterApplicationId } = useParams();
  const [fosterApplication, setFosterApplication] = useState(null);
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_HOST}/api/foster_applications/${fosterApplicationId}/`;
    const fetchConfig = {
      method: "get",
      credentials: "include",
    };
    fetch(url, fetchConfig)
      .then((res) => res.json())
      .then((data) => {
        setFosterApplication(data);
        if (tokenData) {
          setIsRescuer(tokenData.account.rescue_id === data.rescue_id);
        } else setIsRescuer(false);
      })
      .catch((e) => console.error(e));
  }, [tokenData, fosterApplicationId]);

  const handleApprove = async () => {
    const approveUrl = `${process.env.REACT_APP_API_HOST}/api/foster_applications/${fosterApplicationId}/approve/`;
    const fetchConfig = {
      method: "PATCH",
      credentials: "include",
    };
    const resp = await fetch(approveUrl, fetchConfig);
    if (resp.ok) {
      const data = await resp.json();
      setFosterApplication(data);
    } else {
      console.error("fetch approve error");
    }
  };

  const handleReject = async () => {
    const approveUrl = `${process.env.REACT_APP_API_HOST}/api/foster_applications/${fosterApplicationId}/reject/`;
    const fetchConfig = {
      method: "PATCH",
      credentials: "include",
    };
    const resp = await fetch(approveUrl, fetchConfig);
    if (resp.ok) {
      const data = await resp.json();
      setFosterApplication(data);
    } else {
      console.error("fetch reject error");
    }
  };

  if (fosterApplication)
    return (
      <Box sx={{ pt: 12 }}>
        <Typography variant='h3' align='center' sx={{ mb: 3 }}>
          Application Detail
        </Typography>
        <Item sx={{ backgroundColor: "#FFEFD3" }}>
          <Grid
            container
            sx={{ my: 2 }}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>First Name:</Typography>
              {fosterApplication.first_name}
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>Last Name:</Typography>
              {fosterApplication.last_name}
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>
                Phone Number:
              </Typography>
              {fosterApplication.phone_number}
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>Address:</Typography>
              <Typography>
                {fosterApplication.address.address_one}
              </Typography>
              <Typography>
                {fosterApplication.address.address_two}
              </Typography>
              <Typography>{`${fosterApplication.address.city}, ${fosterApplication.address.state}, ${fosterApplication.address.zip_code}`}</Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>
                Has Small Children?
              </Typography>
              <Typography>
                {fosterApplication.has_small_children ? "yes" : "no"}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>Has Dogs?</Typography>
              <Typography>
                {fosterApplication.has_dogs ? "yes" : "no"}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>Has Cats?</Typography>
              <Typography>
                {fosterApplication.has_cats ? "yes" : "no"}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>
                Smoke Free Home?
              </Typography>
              <Typography>
                {fosterApplication.smoke_free_home ? "yes" : "no"}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>
                Residence Type
              </Typography>
              <Typography>{fosterApplication.residence_type}</Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>
                Residence Owned?
              </Typography>
              <Typography>
                {fosterApplication.residence_owned ? "yes" : "no"}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>
                Landlord Restrictions:
              </Typography>
              <Typography>
                {fosterApplication.landlord_restrictions}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>Date Ready:</Typography>
              <Typography>{fosterApplication.date_ready}</Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>
                Wants Preapproval?
              </Typography>
              <Typography>
                {fosterApplication.wants_preapproval ? "yes" : "no"}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>
                Agrees to Terms?
              </Typography>
              <Typography>
                {fosterApplication.agrees_to_terms ? "yes" : "no"}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography sx={{ fontWeight: "bold" }}>Status:</Typography>
              <Typography>{fosterApplication.status}</Typography>
            </Grid>
          </Grid>
        </Item>
        {fosterApplication.status === "Submitted" ? (
          <Box sx={{ my: 2, "& button": { m: 1 } }}>
            <Button
              disabled={!isRescuer}
              onClick={handleApprove}
              variant='contained'
              sx={{ mt: 3, mb: 2, backgroundColor: "#294C60" }}
              endIcon={<PetsIcon />}
            >
              Approve
            </Button>
            <Button
              variant='contained'
              disabled={!isRescuer}
              color='error'
              onClick={handleReject}
              endIcon={<PetsIcon />}
            >
              Reject
            </Button>
            {!isRescuer ? (
              <Typography color='error'>
                Sorry, This Application is Not for Your Rescue!
              </Typography>
            ) : null}
          </Box>
        ) : (
          <Typography sx={{ mt: 2 }} variant='h4' align='center'>
            This Application Has been {fosterApplication.status}
          </Typography>
        )}
      </Box>
    );
}
