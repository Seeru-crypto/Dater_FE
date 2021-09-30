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

  const submitForm = () => {
    //TODO
    //add reference to axios helper function

  }

  useEffect(() => {
    // console.log(reminder);
    // console.log(date);
    // console.log(reminderInDays);
    // console.log(name);
  })

  return (
    <div>
    <div className="p-fluid p-formgrid p-grid">
      <div className="p-field p-col-12 p-md-6" style={{padding: '10px'}}>
        <CalendarComponent dateHandler={dateHandler} />
        </div>

      <div className="p-field p-col-12 p-md-6" style={{padding: '10px'}}>
      <InputText required='true' placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="p-field p-grid p-col-12 p-md-3">
      <div className="checkbox p-col">

        <label className="p-col-fixed" style={{width:'100px'}} style={{paddingRight:"10px"}} >Do you want date reminder?</label>
        <Checkbox inputId="binary" checked={reminder} onChange={e => setReminder(e.checked)} />
      </div>
      </div>


        {
        reminder && (
          <div className="p-field p-grid">
            <label className="p-col-fixed" style={{width:'100px'}} htmlFor="integeronly">How many days notice?</label>
            <div className="p-col p-md-3">
            <InputNumber inputId="integeronly" min={1} max={31} value={reminderInDays} onValueChange={(e) => setReminderInDays(e.value)} />
          </div>
          </div>

        )
      }


    </div>

  {/*<div className="p-field p-grid">*/}
  {/*  <label htmlFor="firstname3" className="p-col-fixed" style={{width:'100px'}}>Firstname</label>*/}
  {/*  <div className="p-col">*/}
  {/*    <InputText id="firstname3" type="text"/>*/}
  {/*  </div>*/}
  {/*</div>*/}
  {/*<div className="p-field p-grid">*/}
  {/*  <label htmlFor="lastname3" className="p-col-fixed" style={{width:'100px'}}>Lastname</label>*/}
  {/*  <div className="p-col">*/}
  {/*    <InputText id="lastname3" type="text"/>*/}
  {/*  </div>*/}
  {/*</div>*/}

    </div>

  )
}
export default AddPerson;