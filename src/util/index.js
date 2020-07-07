const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const colors = {
  activeCases: "#420420",
  CFR: "#420420",
  death: "#420420",
  deathIncrease: "#ed3015",
  hospitalizedCumulative: "#d4b3fa",
  hospitalizedCurrently: "#e772f1",
  hospitalizedIncrease: "#7c49a2",
  inIcuCumulative: "#a19662",
  inIcuCurrently: "#9c8002",
  negative: "#eba5ca",
  onVentilatorCumulative: "#ec0e54",
  onVentilatorCurrently: "#39430b",
  pending: "#000000",
  positive: "#12a9c6",
  positiveIncrease: "#3ccac8",
  positiveIncreaseRatio : "#3ccac8",
  recovered: "#60ea44",
  totalTestResults: "#1e647c",
  totalTestResultsIncrease: "#2e47d6",
};

export const colorsOpaque = {
  activeCases: "rgba(66,4,32,.5)",
  CFR: "rgba(66,4,32,.5)",
  death: "rgba(66,4,32,.5)",
  deathIncrease: "rgba(237,48,21,.5)",
  hospitalizedCumulative: "rgba(212,179,250,.5)",
  hospitalizedCurrently: "rgba(231,114,241,.5)",
  hospitalizedIncrease: "rgba(124,73,162,.5)",
  inIcuCumulative: "rgba(161,150,98,.5)",
  inIcuCurrently: "rgba(156,128,2,.5)",
  negative: "rgba(235,165,202,.5)",
  onVentilatorCumulative: "rgba(236,14,84,.5)",
  onVentilatorCurrently: "rgba(57,67,11,.5)",
  pending: "rgba(66,4,32,.5)",
  positive: "rgba(18,169,198,.5)",
  positiveIncrease: "rgba(60,202,200,.5)",
  positiveIncreaseRatio: "rgba(60,202,200,.5)",
  recovered: "rgba(96,234,68,.5)",
  totalTestResults: "rgba(30,100,124,.5)",
  totalTestResultsIncrease: "rgba(46,71,214,.5)",
};

export const labels = {
  activeCases: "Active Cases",
  CFR: "CFR",
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
  positiveIncreaseRatio: "Positive Case Increase Ratio",
  recovered: "Recovered Cases",
  totalTestResults: "Total Tests",
  totalTestResultsIncrease: "Total Tests Increase",
};

export const formatDate = (dateNumber) => {
  const monthIndex = dateNumber.toString().slice(4, 6);
  const month = months[Number(monthIndex) - 1];
  return `${month} ${dateNumber.toString().slice(6, 8)}`;
};
export const sortDataByLocation = (data, stateStr) => {
  return data.filter((point) => point.state === stateStr);
};
export const createGraphData = (dates, arr, label, color) => {
  let data = [];
  if (dates.length !== 0) {
    for (let i = 0; i < dates.length; i++) {
      data.push({
        x: dates[i],
        y: arr[i],
      });
    }
  }

  return {
    label: label,
    data: data,
    Color: color,
    borderColor: color,
    fill: "false",
    type: "bar",
  };
};

export const statesAbbrev = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

export const ApiDataLabels = [
  "activeCases",
  "CFR",
  "date",
  "death",
  "deathIncrease",
  "hospitalizedCumulative",
  "hospitalizedCurrently",
  "hospitalizedIncrease",
  "lastUpdateEt",
  "inIcuCumulative",
  "inIcuCurrently",
  "negative",
  "onVentilatorCumulative",
  "onVentilatorCurrently",
  "pending",
  "positive",
  "positiveIncrease",
  "positiveIncreaseRatio",
  "recovered",
  "state",
  "totalTestResults",
  "totalTestResultsIncrease",
];

export const sevenDayAverage = (arr, index, dataKey) => {
  if (!arr[index][dataKey]) {
    return null;
  } else if (index < 7) {
    return arr[index][dataKey];
  } else {
    let numArr = arr.slice(index - 6, index + 1);
    numArr = numArr.map((dateSet) => dateSet[dataKey])
    let num = numArr.reduce((sum, currentValue) => sum + currentValue);
    return num / 7;
  }
};
