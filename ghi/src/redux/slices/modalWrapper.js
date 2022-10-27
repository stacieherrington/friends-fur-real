import { Modal, Box } from "@mui/material";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 800,
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  mt: 3,
  overflow: "auto",
};


export default function ModalWrapper() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>INSERT WHATEVER FORM HERE</Box>
    </Modal>
  );
}
