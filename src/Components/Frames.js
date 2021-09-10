import React from "react";
import { useEffect } from "react";

export default function Frames(props) {
  // sets the start time
  const getStartTime = () => {
    props.setStart(
      props.start.map((data) => {
        const date = new Date();
        if (data.id === props.api.id)
          data.start = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };

  // sets the start save time
  const getSaveStartTime = () => {
    props.setSaveStart(
      props.saveStart.map((data) => {
        const date = new Date();
        if (data.id === props.api.id)
          data.start = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };

  // sets the end time
  const getEndTime = () => {
    props.setEnd(
      props.end.map((data) => {
        const date = new Date();
        if (data.id === props.api.id)
          data.end = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };

  // sets the end save time
  const getSaveEndTime = () => {
    props.setSaveEnd(
      props.saveEnd.map((data) => {
        const date = new Date();
        if (data.id === props.api.id)
          data.end = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        return { ...data };
      })
    );
  };


  // useEffect to call api function during the component mouting
  useEffect(() => {
    // settimeout to delay the api calling
    setTimeout(async () => {
      getStartTime();
      const api = props["api"];
      const url = api.url;
      const response = await fetch(url);
      const data = await response.json();
      getEndTime();
      getSaveStartTime();
      props.db.responses.add({ data: data });
      getSaveEndTime();
    }, 5000);
  }, []);

  return (
    <div>
      <div>
        <h4>Start:&nbsp;</h4>
        {props.start[props.api.id - 1].start}
      </div>
      <div>
        <h4>End:&nbsp;</h4>
        {props.end[props.api.id - 1].end}
      </div>
      <div>
        <h4>Start Save:&nbsp;</h4>
        {props.saveStart[props.api.id - 1].start}
      </div>
      <div>
        <h4>End Save:&nbsp;</h4>
        {props.saveEnd[props.api.id - 1].end}
      </div>
    </div>
  );
}
