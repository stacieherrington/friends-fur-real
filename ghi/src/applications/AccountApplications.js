import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";
import {
  useGetTokenQuery,
  useListAccountApplicationsQuery,
} from "../redux/api";
import { Link } from "react-router-dom";
import { Popover } from "@mui/material";
import PetDetailPopover from "../pets/PetDetailPopover";
import CircularUnderLoad from "../components/ProgressCircle";

export default function AccountApplications() {
  const { isLoading: tokenLoading } = useGetTokenQuery();

  const { data: applicationData, isLoading } =
    useListAccountApplicationsQuery();

  const [appList, setAppList] = useState([]);
  const [status, setStatus] = useState("All");

  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const handleDetailClick = (event, id) => {
    setClickedId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleDetailClose = () => {
    setClickedId(null);
    setAnchorEl(null);
  };
  const openDetail = Boolean(anchorEl);
  const popoverClassName = openDetail ? "simple-popover" : undefined;

  useEffect(() => {
    if (applicationData) {
      setAppList(applicationData.applications);
    }
  }, [applicationData]);

  if (tokenLoading) {
    return (
      <>
        <CircularUnderLoad />
      </>
    );
  }

  if (isLoading) {
    return <h1>Loading application data...</h1>;
  }

  const { applications } = applicationData;

  const handleChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);

    event.target.value === "All"
      ? setAppList(applicationData.applications)
      : setAppList(
          applications.filter((app) => app.status === event.target.value)
        );
  };
  if (!isLoading && applications.length === 0) {
    return (
      <Container sx={{ paddingTop: 10 }}>
        <Typography variant='h4' align='center' sx={{ mb: 3 }}>
          You have no applications.
        </Typography>
      </Container>
    );
  }
  return (
    <Container sx={{ paddingTop: 10 }}>
      <Typography variant='h3' align='center' sx={{ mb: 3 }}>
        My Applications
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{
            width: "fit-content 100%",
          }}
          aria-label='simple table'
        >
          <TableHead
            sx={{
              background: "#294C60",
              alignItems: "center",
              "& th": {
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
                padding: 1,
                color: "#FFF",
              },
            }}
          >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>
                <InputLabel
                  id='demo-simple-select-label'
                  sx={{ color: "#FFF" }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Status'
                  value={status}
                  onChange={handleChange}
                  size='small'
                  sx={{ color: "#FFF", border: "1px solid #ced4da" }}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Approved"}>Approved</MenuItem>
                  <MenuItem value={"Submitted"}>Submitted</MenuItem>
                  <MenuItem value={"Rejected"}>Rejected</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appList.map((application) => (
              <TableRow
                key={application.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Button
                    aria-describedby={popoverClassName}
                    onClick={(e) => handleDetailClick(e, application.pet.id)}
                  >
                    {application.pet.name}
                  </Button>
                  <Popover
                    id={popoverClassName}
                    open={clickedId === application.pet.id ? openDetail : false}
                    anchorEl={anchorEl}
                    onClose={handleDetailClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <PetDetailPopover petId={application.pet.id} />
                  </Popover>
                </TableCell>
                <TableCell align='center'>{application.pet.type}</TableCell>
                <TableCell align='center'>{application.pet.breed}</TableCell>
                <TableCell align='center'>
                  {application.status === "Approved" &&
                  !application.story_written ? (
                    <Link to={`/applications/${application.id}/stories/new`}>
                      Approved - Share your adoption story!
                    </Link>
                  ) : (
                    application.status
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
