import React, { Component, createRef } from "react";
import Chart from "chart.js";

export default class Graph extends Component {
  chartRef = createRef();
  datasets = this.props.dataSets;
  labels = this.props.labels;

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.title !== this.props.title ||
      prevProps.logAxes !== this.props.logAxes ||
      prevProps.labels.length !== this.props.labels.length
    ) {

      this.buildChart();
    }
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current;
    const existingCanvas = myChartRef.querySelector("canvas");
    if (existingCanvas) existingCanvas.remove();

    const canvas = document.createElement("canvas");
    myChartRef.appendChild(canvas);

    let scale = "linear";

    if(this.props.logAxes) {
      scale='logarithmic'
    } else {
      scale='linear'
    }

    new Chart(canvas.getContext("2d"), {
      data: {
        labels: this.props.labels,
        datasets: this.props.dataSets,
      },
      options: {
        //Customize chart options
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Date",
              },
            },
          ],
          yAxes: [
            {
              type: scale,
              min: 0,
            },
          ],
        },
      },
    });
  };

  render() {
    return (
      <div
        className={"graph"}
        ref={this.chartRef}
        style={{ minHeight: "300px" }}
      ></div>
    );
  }
}
