import React, { useState, useEffect } from "react";
import CalendarComponent from "./calendar-component";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
//import { PushNewPerson } from '../API/push-new-person';

const AddPerson = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState(false);
  const [reminderInDays, setReminderInDays] = useState(0);

  const dateHandler = (data) => {
    let day = data.getDate();
    let month = data.getMonth() + 1;
    let year = data.getFullYear();
    const date2 = `${day}/${month}/${year}`;
    setDate(date2);
  };

  const submitForm = () => {
    console.log("Form submitted!");
    //TODO
    //add reference to axios helper function
  };

  useEffect(() => {
    // console.log(reminder);
    console.log(date);
    // console.log(reminderInDays);
    // console.log(name);
  }, [date]);

  return (
    <div>
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-6" style={{ padding: "10px" }}>
          <CalendarComponent dateHandler={dateHandler} />
        </div>

        <div className="p-field p-col-12 p-md-6" style={{ padding: "10px" }}>
          <InputText
            required="true"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="p-field p-grid p-col-12 p-md-3">
          <div className="checkbox p-col">
            <label
              className="p-col-fixed"
              style={{ width: "250px", paddingRight: "10px" }}
            >
              Do you want date reminder?
            </label>
            <Checkbox
              inputId="binary"
              checked={reminder}
              onChange={(e) => setReminder(e.checked)}
            />
          </div>
        </div>

        {reminder && (
          <div className="p-field p-grid">
            <label
              className="p-col-fixed"
              style={{ width: "250px" }}
              htmlFor="integeronly"
            >
              How many days notice?
            </label>
            <div className="p-col p-md-3">
              <InputNumber
                inputId="integeronly"
                min={1}
                max={31}
                value={reminderInDays}
                onValueChange={(e) => setReminderInDays(e.value)}
              />
            </div>
          </div>
        )}
      </div>
      <Button style={{ width: "150px" }} label="Submit" onClick={submitForm} />
    </div>
  );
};
export default AddPerson;
