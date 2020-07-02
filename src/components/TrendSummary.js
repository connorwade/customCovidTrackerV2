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
  let lastWeekofData = sortedLocationData.slice(len - 15, len);
  dataKeys.forEach((key) => {
    let lastWeekofKeyData = lastWeekofData.map((dataPoint) => dataPoint[key]);
    let derivatives = lastWeekofKeyData.map((dataPoint, i, arr) =>
      i === 0 ? 0 : dataPoint - arr[i - 1]
    );
    let positiveMag = derivatives
      .filter((x) => x >= 0)
      .reduce((sum, currentValue) => sum + currentValue);
    let negativeMag = derivatives
      .filter((x) => x <= 0)
      .reduce((sum, currentValue) => sum + currentValue);
    console.log(positiveMag, negativeMag);
    let positivesCount = derivatives.filter((x) => x > 0).length;
    let negativesCount = derivatives.filter((x) => x < 0).length;
    console.log(positivesCount, negativesCount);
    if (positivesCount > 7) {
      dataSet.push({ label: labels[key], value: "Rising" });
    } else if (negativesCount < 7) {
      dataSet.push({ label: labels[key], value: "Falling" });
    } else {
      if (positiveMag / negativeMag <= -.95) {
        dataSet.push({ label: labels[key], value: "Rising" });
      } else if (positiveMag / negativeMag >= -1.05) {
        dataSet.push({ label: labels[key], value: "Falling" });
      } else {
        dataSet.push({ label: labels[key], value: "Stable" });
      }
    }
  });

  return (
    <div>
      <Paper elevation={3}>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h5">14 Day Trend Summary</Typography>
              }
              secondary={
                <Typography variant="subtitle1">
                  Calculated from the average change
                </Typography>
              }
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
