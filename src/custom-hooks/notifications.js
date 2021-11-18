export const positiveNotification = (toast, summary, messageBody) => {
    return toast.current.show({
        severity: 'success',
        summary: summary,
        detail: messageBody,
        life: 3000,
    })
}

export const infoNotification = (toast, summary, messageBody) => {
    return toast.current.show({
        severity: 'info',
        summary: summary,
        detail: messageBody,
        life: 3000,
    })
}

export const errorNotification = (toast, summary, messageBody) => {
    return toast.current.show({
        severity: 'error',
        summary: summary,
        detail: messageBody,
        life: 3000,
    })
}
