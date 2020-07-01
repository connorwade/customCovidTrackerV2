import React, { useState } from "react";
import Dashboard from "./Dashboard";
import AppModal from "./AppModal";
import AppInfo from "./AppInfo";
import UserForm from "./UserForm";

import { useApp } from "./appContext";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import MenuIcon from "@material-ui/icons/Menu";
import EditIcon from "@material-ui/icons/Edit";

const MainApp = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userNoticeOpen, setUserNoticeOpen] = useState(false);
  const [deleteSelection, setDeleteSelection] = useState("");
  const [appState, appDispatch] = useApp();

  const currentSelection =
    appState.graphs.find((obj) => {
      return obj.title === appState.currentSelection;
    }) || appState.graphs[0];

  const deleteDataSet = () => {
    appDispatch({ type: "remove_graph_by_title", payload: deleteSelection });
    setDeleteSelection("");
  };

  const infoClickHandler = () => {
    appDispatch({ type: "open_modal" });
    appDispatch({ type: "set_modal_content", payload: <AppInfo /> });
  };

  const addHandler = () => {
    appDispatch({ type: "open_modal" });
    appDispatch({
      type: "set_modal_content",
      payload: (
        <UserForm
          isEdit={false}
          prevTitle={""}
          prevDataKeys={[]}
          prevLocation={""}
        />
      ),
    });
  };

  console.log(currentSelection)
  const editHandler = () => {
    appDispatch({ type: "open_modal" });
    appDispatch({
      type: "set_modal_content",
      payload: (
        <UserForm
          isEdit={true}
          prevTitle={currentSelection.title}
          prevDataKeys={currentSelection.dataKeys}
          prevLocation={currentSelection.location}
        />
      ),
    });
  };

  return (
    <div>
      <AppModal />
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{currentSelection.title}</Typography>
          <IconButton color="inherit" onClick={editHandler}>
            <EditIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => infoClickHandler()}>
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dashboard
        dataKeys={currentSelection.dataKeys}
        title={currentSelection.title}
        location={currentSelection.location}
      />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          <ListItem>
            <IconButton color="inherit" onClick={addHandler}>
              <AddIcon />
            </IconButton>
            <ListItemText
              primary={
                <Typography variant="h6">Custom Covid Project</Typography>
              }
            />
            <IconButton color="inherit" onClick={() => setDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </ListItem>
          <Divider />
          {appState.graphs.map((obj) => (
            <ListItem
              button
              onClick={(e) => {
                appDispatch({
                  type: "set_current_graph",
                  payload: e.target.innerText,
                });
                setDrawerOpen(false);
              }}
            >
              <ListItemText
                primary={<Typography variant="body1"> {obj.title}</Typography>}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    setUserNoticeOpen(true);
                    setDeleteSelection(obj.title);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Dialog
        open={userNoticeOpen}
        keepMounted
        onClose={() => setUserNoticeOpen(false)}
        style={{ zIndex: "10000" }}
      >
        <DialogTitle>Confirm Deletion?</DialogTitle>
        <DialogContentText>
          You wil not be able to retrieve this data set once it has been
          deleted.
        </DialogContentText>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setUserNoticeOpen(false);
              deleteDataSet();
            }}
          >
            Delete Anyway
          </Button>
          <Button
            onClick={() => {
              setUserNoticeOpen(false);
              setDeleteSelection("");
            }}
          >
            Nevermind
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainApp;
