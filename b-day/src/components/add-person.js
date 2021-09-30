import React, {useState} from 'react';
import CalendarComponent from './calendar-component'
const AddPerson = () => {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState(false);
  const [reminderInDays, setReminderInDays] = useState(0);

  const dateHandler = (data) => {
    let day = data.getDate();
    let month = data.getMonth()+1;
    let year = data.getFullYear();
    const date = `${day}/${month}/${year}`
    setDate(date);
  }

  return (
    <div>
      <div>
      <p>name is {name}</p>
      <p>date is {date}</p>
      <p>reminder is {reminder}</p>
      <p>reminderInDays is {reminderInDays}</p>
      </div>
      <br/>
      add Date
      <CalendarComponent dateHandler={dateHandler} />
    </div>
  )
}
export default AddPerson;