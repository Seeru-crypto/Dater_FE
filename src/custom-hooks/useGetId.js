import React from 'react'

import { useState, useEffect } from 'react'

function useGetId(eventEntry) {
    const [id, setId] = useState(null)

    useEffect(() => {
        const eventTag = eventEntry._links.event.href
        // "http://localhost:8081/event/618d55b9908e3175f5c714b1"

        const test = eventTag.substring(28)

        setId(test)
    }, [eventEntry])

    return id
}

export default useGetId
