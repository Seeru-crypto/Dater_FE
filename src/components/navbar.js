import React, { useState, useEffect } from 'react'
import { TabMenu } from 'primereact/tabmenu'

//ToDo
// Add button ,which checks all events and sends email if neccesary, make it hidden/ viewed from the config file value
const Navigationbar = () => {
    const [activeIndex, setActiveIndex] = useState(null)
    const [items] = useState([
        { label: 'Home', icon: 'pi pi-fw pi-home', url: '/' },
        { label: 'Add Event', icon: 'pi pi-fw pi-pencil', url: '/add' },
        { label: 'Event list', icon: 'pi pi-fw pi-file', url: '/eventList' },
        {
            label: 'Calendar',
            icon: 'pi pi-fw pi-calendar',
            url: '/*',
            disabled: true,
        },
        {
            label: 'Admin',
            icon: 'pi pi-fw pi-cog',
            url: '/admin',
            disabled: false,
        },
    ])

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        const activeItem = items.find(({ url }) => url === location.pathname)
        if (!activeItem) return
        const index = items.indexOf(activeItem)
        setActiveIndex(index)
    }, [items])

    return (
        <div>
            <div className="card">
                <TabMenu
                    model={items}
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                />
            </div>
        </div>
    )
}
export default Navigationbar
