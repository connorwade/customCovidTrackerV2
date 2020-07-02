import React from "react";
import IconAttribution from "./IconAttribution";
import { Typography } from "@material-ui/core";

const AppInfo = () => {
  return (
    <div className="appInfo">
      <Typography variant='h4'>About this app</Typography>
      <br></br>
      <Typography variant='body2'>
        The Custom Covid Project was started to cut through the inherit noise in
        many online tracking websites and provide a straight-forward,
        user-focused, and responsible COVID-19 tracker. Using this app, you can
        create your own data sets from a trusted source to see the information
        that matters to you. Trackers that only show confirmed cases and deaths
        miss out on many data points that should matter to users.
      </Typography>
      <br></br>
      <Typography variant='body2'>
        We hope this app can help you make responsible, safe, and thoughtful
        decisions and discussions during this time.
      </Typography>
      <br></br>
      <Typography variant='h4'>Credits</Typography>
      <Typography variant='caption'>
        Created by{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/connorwade"
        >
          Connor Wade
        </a>{" "}
        and&nbsp;
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/austen-wade"
        >
          Austen Wade
        </a>
      </Typography>
      <br></br>
      <Typography variant='caption'>
        Data source:&nbsp;
        <a
          href="https://covidtracking.com/about-data"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          The COVID Tracking Project.
        </a>
      </Typography>
      <IconAttribution />
      <br />
    </div>
  );
};

export default AppInfo;
