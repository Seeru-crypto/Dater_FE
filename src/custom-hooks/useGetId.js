import { useState, useEffect } from 'react'

function useGetId(eventEntry) {
    const [id, setId] = useState(null)

    useEffect(() => {
        const eventTag = eventEntry._links.event.href
        setId(eventTag.substring(28))
    }, [eventEntry])
    return id
}

export default useGetId
