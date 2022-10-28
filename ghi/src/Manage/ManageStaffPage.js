import React from "react";
import StaffTable from "./StaffTable";
import { Box, Toolbar, Typography, Container } from "@mui/material";
import AddStaff from "./AddStaff";
import { useState, useEffect } from "react";

export default function ManageStaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [email, setEmail] = useState("");
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_HOST}/api/manage/staff/`;
    const fetchConfig = {
      method: "GET",
      credentials: "include",
    };
    fetch(url, fetchConfig)
      .then((res) => res.json())
      .then((data) => setStaffList(data.accounts))
      .catch((e) => console.error(e));
  }, [refresh]);

  const promoteStaff = () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/accounts/promote/${email}`;
    const fetchConfig = {
      method: "PATCH",
      credentials: "include",
    };
    fetch(url, fetchConfig)
      .then((res) => res.json())
      .then((data) => {
        if (data) setRefresh((refresh) => refresh + 1);
      })
      .catch((e) => console.error(e));
  };

  return (
    <Container component="main" sx={{ pt: 12 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ pb: 5, fontWeight: "bold" }}
      >
        Manage Staff
      </Typography>
      <StaffTable
        staffList={staffList}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <AddStaff email={email} setEmail={setEmail} promoteStaff={promoteStaff} />
    </Container>
  );
}
