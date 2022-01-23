import React, { useState, useEffect, memo } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { useNavigate } from 'react-router-dom'

const Navigationbar = () => {
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(null)
    const navigateToUrl = (e) => {
        e.originalEvent.preventDefault()
        if (e.item.url) navigate(e.item.url)
    }

    const [items] = useState([
        {
            label: 'Home', icon: 'pi pi-fw pi-home', url: '/',
            command: navigateToUrl,
        },
        {
            label: 'Add Event', icon: 'pi pi-fw pi-pencil', url: '/add',
            command: navigateToUrl,
        },
        {
            label: 'Event list', icon: 'pi pi-fw pi-file', url: '/eventList',
            command: navigateToUrl,
        },
        {
            label: 'Calendar',
            icon: 'pi pi-fw pi-calendar',
            url: '/fullCalendar',
            disabled: false,
            command: navigateToUrl,
        },
        {
            label: 'Admin',
            icon: 'pi pi-fw pi-cog',
            url: '/admin',
            disabled: false,
            command: navigateToUrl,
        },
    ])

    useEffect(() => {
        const activeItem = items.find(
            ({ url }) => url === window.location.pathname,
        )
        if (!activeItem) return
        const index = items.indexOf(activeItem)
        setActiveIndex(index)
    }, [items])

    return (
        <div>
            <div className='card'>
                <TabMenu
                    model={items}
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                />
            </div>
        </div>
    )
}
export default memo(Navigationbar)
