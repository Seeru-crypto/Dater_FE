import config from '../config.json';

export const positiveNotification = (toast, messageHeader, messageBody) => {
  return toast.current.show({
    severity: 'success',
    summary: messageHeader,
    detail: messageBody,
    life: config.TOAST_NOTIFICATION_LENGTH,
  });
};

export const infoNotification = (toast, messageHeader, messageBody) => {
  return toast.current.show({
    severity: 'info',
    summary: messageHeader,
    detail: messageBody,
    life: config.TOAST_NOTIFICATION_LENGTH,
  });
};

export const errorNotification = (toast, messageHeader, messageBody) => {
  return toast.current.show({
    severity: 'error',
    summary: messageHeader,
    detail: messageBody,
    life: config.TOAST_NOTIFICATION_LENGTH,
  });
};
