import React from 'react';
import StaffTable from './StaffTable';
import { Box, Toolbar, Typography, Container } from '@mui/material';
import AddStaff from './AddStaff';
import { useState, useEffect } from 'react';

async function loadStaff() {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/manage/staff/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        const data = await response.json();
        return data.accounts
    } else {
        console.error(response);
    }
}

export default function ManageStaffPage() {
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        setStaffList(loadStaff())
    }, [])

    return (
        <Container component="main" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center">Manage Staff</Typography>
            <StaffTable staffList={staffList} />
            <AddStaff />
        </Container>
    )
}
