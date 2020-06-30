import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { useApp } from "./appContext";

const AppModal = () => {
  const [appState, appDispatch] = useApp();

  return (
    <Dialog
      open={appState.modalOpen}
      onClose={() => appDispatch({ type: "close_modal" })}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-dsicription"
    >
      <DialogContent>{appState.modalContent}</DialogContent>
    </Dialog>
  );
};

export default AppModal;
