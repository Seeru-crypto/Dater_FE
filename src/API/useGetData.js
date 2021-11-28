import { useEffect, useState } from 'react'

import axios from 'axios'

const useGetData = (url) => {
    const [isPending, setIsPending] = useState(true)
    const [getData, setData] = useState()

    useEffect(() => {
        setTimeout(() => {
            axios.get(url).then((data) => {
                setData(data)
                setIsPending(false)
            })
        }, 1500)
    }, [url])
    return { getData, isPending }
}
export default useGetData
