import React, {useState} from 'react'
import { TabMenu } from 'primereact/tabmenu';

//ToDo
// Add button ,which checks all events and sends email if neccesary, make it hidden/ viewed from the config file value
// Fix active page bug
const Navigationbar = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', url:'/'},
        {label: 'Add Event', icon: 'pi pi-fw pi-pencil', url:'/add'},
        {label: 'Event list', icon: 'pi pi-fw pi-file', url:'/eventList'},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar', url:'/*', disabled:true},
        {label: 'Admin', icon: 'pi pi-fw pi-cog', url:'/admin', disabled: true}
    ];

    return (
        <div>
            <div style={{paddingLeft:"19.5rem"}} className="card">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            </div>
        </div>
    )
}
export default Navigationbar