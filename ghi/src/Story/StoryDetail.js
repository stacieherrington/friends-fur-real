import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Copyright from "../components/Copyright";
import { useGetTokenQuery } from '../redux/api';



export default function StoryDetail() {
  const [story, setStory] = useState('');
  const { storyId } = useParams();
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useGetTokenQuery();
  const [isRescuer, setIsRescuer] = useState(false);


  useEffect(() => {
    const url = `${process.env.REACT_APP_API_HOST}/api/stories/${storyId}/`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setStory(data);
        if (tokenData) {
          setIsRescuer(tokenData.account.rescue_id === data.rescue_id)
        }
      })
      .catch(e => console.error(e))

  }, [tokenData]);

  const handleApprove = async () => {
    const approveUrl = `${process.env.REACT_APP_API_HOST}/api/stories/${storyId}/approve/`;
    const fetchConfig = {
      method: 'PATCH',
      credentials: "include",
    }
    const resp = await fetch(approveUrl, fetchConfig);
    if (resp.ok) {
      const data = await resp.json();
      setStory(data);
    }
    else { console.error("fetch approve error") }
  }
  const handleReject = async () => {
    const approveUrl = `${process.env.REACT_APP_API_HOST}/api/stories/${storyId}/reject/`;
    const fetchConfig = {
      method: 'PATCH',
      credentials: "include",
    }
    const resp = await fetch(approveUrl, fetchConfig);
    if (resp.ok) {
      const data = await resp.json();
      setStory(data);
    }
    else { console.error("fetch approve error") }
  }


  return (
    <>
      <Box sx={{ mt: '7%', mb: 0, py: 4, alignSelf: 'center', backgroundColor: '#FFEFD3', height: "100%", alignContent: 'center' }}>
        <Box sx={{ marginX: '2%', height: 'fit-content', padding: 2 }} align='center'>
          {story.picture ? <img src={story.picture} width="30%" alt="pet" /> : null}
          <hr class="solid" />
          <Typography sx={{ mb: 1.5, fontSize: 25, fontWeight: 'bold', textAlign: 'justify' }} color="#FF9633">
            {story.title}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'justify' }}>
            {story.story}
          </Typography>
        </Box>
        {story.status === "Submitted" ?
          <Box sx={{ my: 2, '& button': { m: 1 } }}>
            <Button variant="contained" disabled={!isRescuer} color="success" onClick={handleApprove}>Approve</Button>
            <Button variant="contained" disabled={!isRescuer} color="error" onClick={handleReject}>Reject</Button>
            {!isRescuer ? <Typography color="error">Sorry, This Application is Not for Your Rescue!</Typography> : null}
          </Box> :
          <Typography sx={{ mt: 2 }} variant='h4' align='center'>This Application Has been {story.status}</Typography>
        }
      </Box>
      <Copyright sx={{ mt: 7, mb: 0 }} />
    </>
  )
}
