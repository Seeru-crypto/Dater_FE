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

// ToDo Replace PatchSettings
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

// ToDo Replace PostSendEmailReminders
export const PostSendEmailReminders = async (url) => {
    const data = {}
    return axios.post(url, data)
}
