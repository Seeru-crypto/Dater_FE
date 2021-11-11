import { useState, useEffect } from 'react'

function useGetId(eventEntry) {
    const [id, setId] = useState(null)

    useEffect(() => {
        const eventTag = eventEntry._links.event.href
        const test = eventTag.substring(28)

        setId(test)
    }, [eventEntry])

    return id
}

export default useGetId
