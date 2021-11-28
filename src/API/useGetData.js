import { useEffect, useState } from 'react'

import axios from 'axios'

const useGetData = (url) => {
    const [isPending, setIsPending] = useState(true)
    const [getData, setData] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            axios
                .get(url)
                .then((data) => {
                    setData(data)
                    setIsPending(false)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted - 1')
                    } else {
                        console.log('fetch aborted - 2')
                        setIsPending(false)
                        setError(err.message)
                    }
                })
        }, 1500)
    }, [url])
    return { getData, isPending, error }
}
export default useGetData
