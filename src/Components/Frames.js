import React from "react";
import { useEffect } from "react";

export default function Frames(props) {
  // destructured imp props
  const prop = props.obj;

  // sets the start time
  const getTime = (place, setPlace, time) => {
    setPlace(
      place.map((data) => {
        const date = new Date();
        if (data.id === props.api.id)
          data[
            time
          ] = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };

  // useEffect to call api function during the component mouting
  useEffect(() => {
    // settimeout to delay the api calling
    setTimeout(async () => {
      // getting start and end time
      getTime(prop.start, prop.setStart, "start");
      const api = props["api"];
      const url = api.url;
      const response = await fetch(url);
      const data = await response.json();
      getTime(prop.end, prop.setEnd, "end");

      // getting saveStart and saveEnd time
      getTime(prop.saveStart, prop.setSaveStart, "saveStart");
      prop.db.responses.add({ data: data });
      getTime(prop.saveEnd, prop.setSaveEnd, "saveEnd");
    }, 5000);
  }, []);

  return (
    <div>
      <div>
        <h4>Start:&nbsp;</h4>
        {prop.start[props.api.id - 1].start}
      </div>
      <div>
        <h4>End:&nbsp;</h4>
        {prop.end[props.api.id - 1].end}
      </div>
      <div>
        <h4>Start Save:&nbsp;</h4>
        {prop.saveStart[props.api.id - 1].saveStart}
      </div>
      <div>
        <h4>End Save:&nbsp;</h4>
        {prop.saveEnd[props.api.id - 1].saveEnd}
      </div>
    </div>
  );
}
