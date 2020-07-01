import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import { sortDataByLocation, labels } from "../util/index";

const TrendSummary = ({ apiData, dataKeys, location }) => {
  const sortedLocationData = sortDataByLocation(apiData, location);
  let dataSet = [];
  let len = sortedLocationData.length - 1;
  let lastWeekofData = sortedLocationData.slice(len - 14, len);
  dataKeys.forEach((key) => {
    let lastWeekofKeyData = lastWeekofData.map((dataPoint) => dataPoint[key]);
    let derivatives = lastWeekofKeyData.map((dataPoint, i, arr) =>
      i === 0 ? 0 : dataPoint - arr[i - 1]
    );
    let num = derivatives.reduce((sum, currentValue) => sum + currentValue);
    let mean = num / 13;
    if(mean > 0) {
        dataSet.push({label: labels[key], value: 'Rising'})
    } else if(mean < 0) {
        dataSet.push({label: labels[key], value: 'Falling'})
    } else {
        dataSet.push({label: labels[key], value: 'Stable'})
    }
  });

  return (
    <div>
      <Paper elevation={3}>
        <List>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h5">14 Day Trend Summary</Typography>}
              secondary={<Typography variant="subtitle1">Calculated from the derivative average</Typography>}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          {dataSet.map((set) => (
            <ListItem
              key={set.label + location}
              alignItems="flex-start"
              divider={true}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {set.label}
                  </Typography>
                }
                secondary={<Typography variant="h6">{set.value}</Typography>}
              />
              {/* <ListItemText primary={<Typography variant="h6">{set.value}</Typography>} /> */}
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default TrendSummary;
