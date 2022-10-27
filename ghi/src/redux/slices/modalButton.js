import { Button, Grid } from "@mui/material";
import { useState } from "react";

export default function ModalButton(props) {
  const [modalButton, setModalButton] = useState(false);
  const handleOpen = () => setModalButton(true);
  const handleClose = () => setModalButton(false);
  return (
    <Grid container justifyContent='flex-end'>
      <Grid item>
      <Button onClick={handleOpen}>{props.close}</Button>
        <Button onClick={handleOpen}>{props.confirm}</Button>
      </Grid>
    </Grid>
  );
}
