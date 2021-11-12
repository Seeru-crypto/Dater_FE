import axios from 'axios'

export const DeleteData = async (url, id) => {
    const path = url + '/' + id
    const res = await axios.delete(path)
    return res.status
}

export const GetData = async (url) => {
    const res = await axios.get(url)
    return res
}

export const GetDataById = async (url, id) => {
    const path = (url, '/' + id)
    const res = await axios.get(path)
    return res
}

export const PostData = async (url, data) => {
    const res = axios.post(url, data)
    return res
}

export const UpdateData = async (url, data) => {
    const res = axios.put(url, data)
    return res
}
