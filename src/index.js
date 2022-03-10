import React from "react";
import ReactDOM from "react-dom";

import Calendar from "./components/calendar";

function App() {
  return <Calendar onDaySelect={date => { console.log('New date set', date); }} dateStatuses={{
    "2022-03-01": "status-green",
    "2022-03-02": "status-yellow",
    "2022-03-03": "status-green",
    "2022-03-04": "status-green",
    "2022-03-05": "status-green",
    "2022-03-06": "status-red",
    "2022-03-07": "status-green",
    "2022-03-08": "status-green",
  }} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
