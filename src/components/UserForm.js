import React, { useState } from "react";
import GraphStorage from "./GraphStorage";

import {
  Select,
  InputLabel,
  MenuItem,
  Chip,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
} from "@material-ui/core";
import { useApp } from "./appContext";
import { statesAbbrev } from "../util";

export default function UserForm() {
  //Form Prototype
  const [location, setLocation] = useState("");
  const [dataKeys, setDataKeys] = useState([]);
  const [title, setTitle] = useState("");
  const [, appDispatch] = useApp();

  const stateAbb = Object.keys(statesAbbrev);

  const stateHandleChange = (event) => {
    setLocation(event.target.value);
  };

  const dataMap = {
    death: "Death",
    deathIncrease: "Death Increase",
    hospitalizedCumulative: "Hospitalized Cumulative",
    hospitalizedCurrently: "Hospitalized Currently",
    hospitalizedIncrease: "Hospitalized Increase",
    inIcuCumulative: "ICU Cumulative",
    inIcuCurrently: "ICU Currently",
    negative: "Negative Test Result",
    onVentilatorCumulative: "Ventilator Cumulative",
    onVentilatorCurrently: "Ventilator Currently",
    pending: "Current Unreturned Tests",
    positive: "Positive Cases",
    positiveIncrease: "Positive Case Increase",
    recovered: "Recovered Cases",
    totalTestResults: "Total Tests",
    totalTestResultsIncrease: "Total Tests Increase",
  };

  const dataHandleChange = (event) => {
    setDataKeys(event.target.value);
  };

  const titleHandleChange = (event) => {
    setTitle(event.target.value);
  };

  const onSubmitHandleClick = (e) => {
    if (e) e.preventDefault();
    if (location && dataKeys && title) {
      let newGraph = new GraphStorage(location, dataKeys, title);
      appDispatch({ type: "add_graph", payload: newGraph });
      appDispatch({ type: "set_current_graph", payload: title });
      appDispatch({ type: "close_modal" });
      setLocation("");
      setDataKeys([]);
      setTitle("");
    }
  };
  return (
    <form onSubmit={onSubmitHandleClick} className={"form"}>
      <DialogTitle id="form-dialog-title">Create New Data Set</DialogTitle>
      <DialogContent>
        <FormGroup style={{ marginBottom: 20 }}>
          <TextField
            id="title"
            label="Graph Title"
            value={title}
            onChange={(event) => {
              titleHandleChange(event);
            }}
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: 20 }}>
          <InputLabel>State</InputLabel>
          <Select
            value={location}
            onChange={(event) => {
              stateHandleChange(event);
            }}
          >
            {stateAbb.map((location, i) => (
              <MenuItem key={i} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
        <FormGroup style={{ marginBottom: 20, overflowX: "auto" }}>
          <InputLabel>Data</InputLabel>
          <Select
            multiple
            value={dataKeys}
            onChange={(event) => {
              dataHandleChange(event);
            }}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value} label={dataMap[value]} />
                ))}
              </div>
            )}
          >
            {Object.keys(dataMap).map((dataKey, i) => (
              <MenuItem key={i} value={dataKey}>
                {dataMap[dataKey]}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={onSubmitHandleClick}
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </form>
  );
}
