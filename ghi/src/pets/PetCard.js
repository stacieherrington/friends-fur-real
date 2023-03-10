import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  useDeletePetMutation,
  useGetCurrentAccountQuery,
  useGetTokenQuery,
} from "../redux/api";
import { Popover, Box } from "@mui/material";
import PetDetailPopover from "./PetDetailPopover";
import { useDispatch } from "react-redux";
import { LOGIN_MODAL, openModal } from "../redux/slices/modalSlice";
import { preventDefault } from "../redux/utility";
import ApplicationForm from "../applications/ApplicationForm";
export default function PetCard(props) {
  const dispatch = useDispatch();
  const { data: token } = useGetTokenQuery();

  const { id, rescue_id } = props.pet;
  const [open, setOpen] = React.useState(false);
  const [deletePet] = useDeletePetMutation();
  const { data } = useGetCurrentAccountQuery();
  const isRescuer = data && data.rescue_id === props.pet.rescue_id;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleDetailClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDetailClose = () => {
    setAnchorEl(null);
  };
  const openDetail = Boolean(anchorEl);
  const detailId = openDetail ? "simple-popover" : undefined;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 680,
      }}
    >
      {props.pet.pictures && props.pet.pictures.length ? (
        <CardMedia          
          component="img"
          width="100%"
          src={props.pet.pictures}
          alt={props.pet.breed}
        />
      ) : null}
      <CardContent sx={{ pl: 2, pt:1}}>
        <Typography gutterBottom variant="h5" sx={{fontWeight:"bold"}} component="div">
          {props.pet.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {props.pet.description}
        </Typography>
      </CardContent>
      <CardActions sx={{pt:2, pb:0}}>
        <Button
          sx={{ textAlign: "center", paddingLeft:1 }}
     
          aria-describedby={detailId}
          onClick={handleDetailClick}
        >
          More Info
        </Button>
        <Popover
          id={detailId}
          open={openDetail}
          anchorEl={anchorEl}
          onClose={handleDetailClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <PetDetailPopover petId={id} />
        </Popover>

        {token ? (
          <ApplicationForm pet_id={id} rescue_id={rescue_id} />
        ) : (
          <Button
            onClick={preventDefault(() => {
              dispatch(openModal(LOGIN_MODAL));
            })}
          >
            Adopt me!
          </Button>
        )}
      </CardActions>
      <CardActions sx={{pt:0, pb:0, pl:1.3}} >
        {isRescuer && (
          <>
            <Button
              sx={{ pt: 0, mb: 5, pr:4 }}
              size="small"
              href={`/pets/${props.pet.id}`}
            >
              Update
            </Button>
            <Button
              sx={{ pt: 0, mb: 5, pl: 3 }}
              size="small"
              onClick={handleClickOpen}
            >
              Delete
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this pet?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleClose();
                    deletePet(props.pet.id);
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </CardActions>
    </Card>
  );
}
