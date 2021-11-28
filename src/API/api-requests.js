import axios from 'axios'

export const DeleteData = async (url, id) => {
    const path = url + '/' + id
    const res = await axios.delete(path)
    return res.status
}

export const PostData = async (url, data) => {
    return axios.post(url, data)
}

export const UpdateData = async (url, data) => {
    return axios.put(url, data)
}

export const PostSendEmailReminders = async (url) => {
    const data = {}
    return axios.post(url, data)
}
