import React, {useState, useEffect} from 'react';
import CalendarComponent from './calendar-component'
import { InputText } from 'primereact/inputtext';
import {Checkbox} from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';

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

  useEffect(() => {
    // console.log(reminder);
    // console.log(date);

  })

  return (
    <div className="p-grid">
      <div className="p-col" style={{padding: '10px'}}>
        <p>Add Date</p>
        <CalendarComponent dateHandler={dateHandler} />
        </div>

      <div className="p-col" style={{padding: '10px'}}>
      <p>Add name</p>
      <InputText value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="p-col">
      <div className="p-field-checkbox">
        <label style={{padding: '10px'}}>Do you want date reminder?</label>
        <Checkbox inputId="binary" checked={reminder} onChange={e => setReminder(e.checked)} />
      </div>
      </div>

      <div className="p-col">{
        reminder && (
          <div>
            <label style={{padding: '10px'}} htmlFor="integeronly">How may days before?</label>
            <InputNumber inputId="integeronly" min={1} max={31} value={reminderInDays} onValueChange={(e) => setReminderInDays(e.value)} />
          </div>
        )
      }
      </div>

    </div>
  )
}
export default AddPerson;