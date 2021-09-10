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

  // updates start time after clicking the button
  const getStartUpdate = (id) => {
    setStart(
      start.map((data) => {
        const date = new Date();
        if (data.id === id)
          data.start = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };

  // updates start save time after clicking the button
  const getStartSaveUpdate = (id) => {
    setSaveStart(
      saveStart.map((data) => {
        const date = new Date();
        if (data.id === id)
          data.start = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };

  // updates end time after clicking the button
  const getEndUpdate = (id) => {
    setEnd(
      end.map((data) => {
        const date = new Date();
        if (data.id === id)
          data.end = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };

  // updates end save time after clicking the button
  const getEndSaveUpdate = (id) => {
    setSaveEnd(
      saveEnd.map((data) => {
        const date = new Date();
        if (data.id === id)
          data.end = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };

  // function to the apis for updating
  async function updateApi(id) {
    getStartUpdate(id);
    const api = apiList[id - 1];
    const url = api.url;
    const response = await fetch(url);
    const data = await response.json();
    getEndUpdate(id);
    getStartSaveUpdate(id);
    db.responses.add({ data: data });
    getEndSaveUpdate(id);
  }

  return (
    <div className="App">
      <h1>Test App</h1>
      <div className="Frames">
        {apiList.map((api) => {
          return (
            <Frames
              key={api.id}
              api={api}
              db={db}
              start={start}
              end={end}
              setStart={setStart}
              setEnd={setEnd}
              saveStart={saveStart}
              saveEnd={saveEnd}
              setSaveEnd={setSaveEnd}
              setSaveStart={setSaveStart}
            />
          );
        })}
      </div>
      <div className="Buttons">
        {apiList.map((api) => {
          return <Buttons key={api.id} props={api} updateApi={updateApi} />;
        })}
      </div>
    </div>
  );
}
