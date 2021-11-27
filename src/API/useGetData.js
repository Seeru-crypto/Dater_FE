import { useEffect, useState } from 'react'

import axios from 'axios'

const useGetData = ({ url }) => {
    const [isPending, setIsPending] = useState(true)
    const [getData, setData] = useState()
    useEffect(() => {
        axios.get(url).then((data) => {
            setData(data)
            setIsPending(true)
        })
    }, [url])
    console.log('in Custom hook ', { getData, isPending })
    return { getData, isPending }
}
export default useGetData
