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
  useListAccountFosterApplicationsQuery,
} from "../redux/api";
import { Link } from "react-router-dom";
import { Popover } from "@mui/material";
import PetDetailPopover from "../pets/PetDetailPopover";
import CircularUnderLoad from "../components/ProgressCircle";

export default function AccountFosterApplications() {
  const { isLoading: tokenLoading } = useGetTokenQuery();

  const { data: fosterApplicationData, isLoading } =
    useListAccountFosterApplicationsQuery();

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
    if (fosterApplicationData) {
      setAppList(fosterApplicationData.foster_applications);
    }
  }, [fosterApplicationData]);

  if (tokenLoading) {
    return (
      <>
        <CircularUnderLoad />
      </>
    );
  }

  if (isLoading) {
    return <h1>Loading fosterApplication data...</h1>;
  }

  const { foster_applications } = fosterApplicationData;

  const handleChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);

    event.target.value === "All"
      ? setAppList(fosterApplicationData.foster_applications)
      : setAppList(
          foster_applications.filter(
            (app) => app.status === event.target.value
          )
        );
  };

  if (!isLoading && foster_applications.length === 0) {
    return (
      <Container sx={{ paddingTop: 10 }}>
        <Typography variant='h4' align='center' sx={{ mb: 3 }}>
          You have no foster_applications.
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
            {appList.map((fosterApplication) => (
              <TableRow
                key={fosterApplication.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Button
                    aria-describedby={popoverClassName}
                    onClick={(e) =>
                      handleDetailClick(e, fosterApplication.pet.id)
                    }
                  >
                    {fosterApplication.pet.name}
                  </Button>
                  <Popover
                    id={popoverClassName}
                    open={
                      clickedId === fosterApplication.pet.id
                        ? openDetail
                        : false
                    }
                    anchorEl={anchorEl}
                    onClose={handleDetailClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <PetDetailPopover petId={fosterApplication.pet.id} />
                  </Popover>
                </TableCell>
                <TableCell align='center'>
                  {fosterApplication.pet.type}
                </TableCell>
                <TableCell align='center'>
                  {fosterApplication.pet.breed}
                </TableCell>
                <TableCell align='center'>
                  {fosterApplication.status === "Approved" &&
                  !fosterApplication.story_written ? (
                    <Link
                      to={`/foster_applications/${fosterApplication.id}/stories/new`}
                    >
                      Approved - Share your foster story!
                    </Link>
                  ) : (
                    fosterApplication.status
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
