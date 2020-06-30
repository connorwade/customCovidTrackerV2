import React, { useState } from "react";
import {
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@material-ui/core";

import Graph from "./Graph";
import {
  colors,
  colorsOpaque,
  labels,
  formatDate,
  sortDataByLocation,
} from "../util/index";

const GraphContainer = ({ apiData, dataKeys, location, title }) => {
  const [daysShown, setDaysShown] = useState(60);
  const [logAxes, setLogAxes] = useState(false);

  const sortedLocationData = sortDataByLocation(apiData, location);

  console.log(sortedLocationData);

  let dataSets = [];
  let dates = [];

  let end = sortedLocationData.length;
  let begin = end - daysShown;

  for (let u = 0; u < daysShown; u++) {
    let date = formatDate(sortedLocationData[begin + u].date);
    dates[u] = date;
  }
  for (let j = 0; j < dataKeys.length; j++) {
    dataSets[j] = {
      label: "",
      backgroundColor: "",
      borderColor: "",
      data: [],
      type: "line",
    };
    let dataKey = dataKeys[j];
    dataSets[j]["label"] = labels[dataKey];
    dataSets[j]["backgroundColor"] = colorsOpaque[dataKey];
    dataSets[j]["borderColor"] = colors[dataKey];
    for (let i = 0; i < daysShown; i++) {
      let item = sortedLocationData[begin + i];
      let yValue = item[dataKey];
      dataSets[j].data[i] = yValue;
    }
  }

  const handleSelectChange = (e) => {
    setDaysShown(e.target.value);
  };

  return (
    <Paper elevation={3}>
      <Graph
        labels={dates}
        dataSets={dataSets}
        title={title}
        logAxes={logAxes}
        style={{height:'auto'}}
      />
      <FormControl variant="outlined">
        <InputLabel>Days Shown</InputLabel>
        <Select
          value={daysShown}
          onChange={handleSelectChange}
          label="Days Shown"
        >
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={14}>14 Days</MenuItem>
          <MenuItem value={30}>30 Days</MenuItem>
          <MenuItem value={60}>60 Days</MenuItem>
          <MenuItem value={100}>100 Days</MenuItem>
          <MenuItem value={end}>All</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <FormControlLabel
          value="start"
          control={
            <Switch
              checked={logAxes}
              onChange={() => (logAxes ? setLogAxes(false) : setLogAxes(true))}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          }
          label="Logarithmic Scale"
          labelPlacement="start"
        />
      </FormControl>
    </Paper>
  );
};

export default GraphContainer;
