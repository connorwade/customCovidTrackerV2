import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import { sortDataByLocation, formatDate, labels } from "../util";

const Summary = ({ apiData, dataKeys, location }) => {
  const sortedLocationData = sortDataByLocation(apiData, location);

  let len = sortedLocationData.length - 1;
  let dataSet = [];
  let date = formatDate(sortedLocationData[len].date);

  dataKeys.forEach((key) => {
    dataSet.push({
      label: labels[key],
      value: sortedLocationData[len][key]
        ? sortedLocationData[len][key]
        : "Not Reported",
    });
  });

  return (
    <div>
      <Paper elevation={3}>
        <List>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h4">{date}</Typography>}
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

export default Summary;
