import React from "react";
import Frames from "./Components/Frames";
import Buttons from "./Components/Buttons";
import Dexie from "dexie";
import "./App.css";
import { apiList } from "./Api";
import { useState } from "react";
import { startData } from "./Info";
import { endData } from "./Info";
import { startSaveData } from "./Info";
import { endSaveData } from "./Info";

export default function App() {
  // made an instance of dexie
  const db = new Dexie("IndexedDB");

  // created a database with auto-incrementing primary key
  db.version(1).stores({
    responses: "++id, data",
  });

  // catching the error while opening db
  db.open().catch((err) => {
    console.log(err || err.stack);
  });

  // states for the different times in a frame component
  const [start, setStart] = useState(startData);
  const [end, setEnd] = useState(endData);
  const [saveStart, setSaveStart] = useState(startSaveData);
  const [saveEnd, setSaveEnd] = useState(endSaveData);

  // making an obj to pass as props in frame
  const obj = {
    db: db,
    start: start,
    end: end,
    setStart: setStart,
    setEnd: setEnd,
    saveStart: saveStart,
    saveEnd: saveEnd,
    setSaveStart: setSaveStart,
    setSaveEnd: setSaveEnd,
  };

  // updates start time after clicking the button
  const getUpdate = (id, place, setPlace, time) => {
    console.log(time);
    setPlace(
      place.map((data) => {
        const date = new Date();
        if (data.id === id)
          data[
            time
          ] = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };

  // function to the apis for updating
  async function updateApi(id) {
    // start and end time
    getUpdate(id, start, setStart, "start");
    const api = apiList[id - 1];
    const response = await fetch(api.url);
    const data = await response.json();
    getUpdate(id, end, setEnd, "end");

    // saveStart and saveEnd time
    getUpdate(id, saveStart, setSaveStart, "saveStart");
    db.responses.add({ data: data });
    getUpdate(id, saveEnd, setSaveEnd, "saveEnd");
  }

  return (
    <div className="App">
      <h1>Test App</h1>
      <div className="Frames">
        {apiList.map((api) => {
          return <Frames key={api.id} api={api} obj={obj} />;
        })}
      </div>
      <div className="Buttons">
        {apiList.map((api) => {
          return <Buttons key={api.id} api={api} updateApi={updateApi} />;
        })}
      </div>
    </div>
  );
}
