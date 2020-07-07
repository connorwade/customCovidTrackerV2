import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Grid } from "@material-ui/core";
import Summary from "./Summary";
import GraphContainer from "./GraphContainer";
import TrendSummary from './TrendSummary';

const Dashboard = ({ dataKeys, title, location }) => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const URL = "https://covidtracking.com/api/v1/states/daily.json";

  const getData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    let newData =[]; 
    data.forEach(
      (d) => {
        newData.push(
          {...d,
            positiveIncreaseRatio: d.positiveIncrease/d.totalTestResultsIncrease * 100,
            CFR: d.death/d.positive * 100,
            activeCases: d.positive - d.death - d.recovered,
          }
        ) 
      }
    )
    newData.reverse();
    setApiData(newData);
    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading ? (
        <Grid
          style={{ height: "100vh" }}
          container
          justify={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid
          style={{ height: "100%", paddingTop: "16px" }}
          container
          direction={"column"}
          justify={"center"}
          spacing={2}
        >
          <Grid item>
            <GraphContainer
              apiData={apiData}
              dataKeys={dataKeys}
              location={location}
              title={title}
            />
          </Grid>
          <Grid item>
            <Summary
              apiData={apiData}
              dataKeys={dataKeys}
              location={location}
            />
          </Grid>
          <Grid item>
            <TrendSummary
              apiData={apiData}
              dataKeys={dataKeys}
              location={location}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
