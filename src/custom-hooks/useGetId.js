import { useState, useEffect } from 'react'

function useGetId(eventEntry) {
    const [id, setId] = useState(null)

    useEffect(() => {
        const eventTag = eventEntry._links.event.href
        const eventId = eventTag.substring(28)

        setId(eventId)
    }, [eventEntry])

    return id
}

export default useGetId
