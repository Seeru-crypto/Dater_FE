import axios from 'axios'

export const DeleteData = async (url, id) => {
    const path = url + '/' + id
    const res = await axios.delete(path)
    return res.status
}

export const GetData = async (url) => {
    return axios.get(url)
}

export const GetDataById = async (url, id) => {
    const path = (url, '/' + id)
    return axios.get(path)
}

export const PostData = async (url, data) => {
    return axios.post(url, data)
}

export const UpdateData = async (url, data) => {
    return axios.put(url, data)
}
