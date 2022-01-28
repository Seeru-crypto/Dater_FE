import axios from 'axios'
import config from '../config.json'
import {
    positiveNotification,
    errorNotification,
    infoNotification,
} from '../custom-hooks/notifications'

const defaultErrorMessage = config.labels.defaultErrorMessage
const eventCreatedMessage = config.labels.eventCreatedMessage
const eventUpdatedMessage = config.labels.eventUpdatedMessage
export const DeleteData = async (url, id, toast) => {
    const path = url + '/' + id
    return axios
        .delete(path)
        .then((res) => {
            infoNotification(
                toast,
                'Delete successful',
                'This event has been deleted',
            )
            return res
        })
        .catch(() => {
            errorNotification(toast, defaultErrorMessage)
        })
}

export const PostData = async (url, data, toast) => {
    return axios
        .post(url, data)
        .then(() => {
            positiveNotification(toast, eventCreatedMessage, '')
        })
        .catch(() => {
            errorNotification(toast, defaultErrorMessage)
        })
}

export const UpdateData = async (url, data, toast) => {
    return axios
        .put(url, data)
        .then(() => {
            positiveNotification(toast, eventUpdatedMessage, '')
        })
        .catch(() => {
            errorNotification(toast, defaultErrorMessage)
        })
}

export const PatchSettings = async (url, data, toast) => {
    return axios
        .patch(url, data)
        .then(() => {
            positiveNotification(toast, eventUpdatedMessage, '')
        })
        .catch(() => {
            errorNotification(toast, defaultErrorMessage)
        })
}

export const PostSendEmailReminders = async (url) => {
    const data = {}
    return axios.post(url, data)
}
