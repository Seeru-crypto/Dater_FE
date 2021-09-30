import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const CalendarComponent = ({dateHandler}) => {
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = (month === 0) ? 11 : month - 1;
  let prevYear = (prevMonth === 11) ? year - 1 : year;
  let nextMonth = (month === 11) ? 0 : month + 1;
  let nextYear = (nextMonth === 0) ? year + 1 : year;

  const [date16, setDate16] = useState(null);

  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  let invalidDates = [today];

  const yearNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
  }
  const monthNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
  }

  return(
    <div className="card">
      <div className="p-fluid p-grid p-formgrid">

    <div className="p-field p-col-12 p-md-4">
    {/*<div>*/}
    {/*<label htmlFor="navigatorstemplate">Navigators Template</label>*/}
      {/*<Calendar id="navigatorstemplate" value={date16} onChange={(e) => setDate16(e.value)} monthNavigator yearNavigator yearRange="1950:2030"*/}
      <Calendar id="navigatorstemplate" value={date16} onChange={(e) => dateHandler(e.value)} monthNavigator yearNavigator yearRange="1950:2030"
              monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} />
  </div>
      </div>

    </div>

  )}
export default CalendarComponent;
