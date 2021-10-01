import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const CalendarComponent = ({ dateHandler }) => {
    const [date16, setDate16] = useState(null);

    const yearNavigatorTemplate = (e) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) =>
                    e.onChange(event.originalEvent, event.value)
                }
                className="p-ml-2"
                style={{ lineHeight: 1 }}
            />
        );
    };
    const monthNavigatorTemplate = (e) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) =>
                    e.onChange(event.originalEvent, event.value)
                }
                style={{ lineHeight: 1 }}
            />
        );
    };

    return (
        <div>
            <Calendar
                required="true"
                placeholder="Add date"
                id="navigatorstemplate"
                value={date16}
                onChange={(e) => dateHandler(e.value)}
                monthNavigator
                yearNavigator
                yearRange="1950:2030"
                monthNavigatorTemplate={monthNavigatorTemplate}
                yearNavigatorTemplate={yearNavigatorTemplate}
            />
        </div>
    );
};
export default CalendarComponent;
