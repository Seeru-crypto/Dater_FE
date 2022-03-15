export const positiveNotification = (toast, summary, messageBody) => {
  return toast.current.show({
    severity: 'success',
    summary,
    detail: messageBody,
    life: 5000,
  });
};

export const infoNotification = (toast, summary, messageBody) => {
  return toast.current.show({
    severity: 'info',
    summary,
    detail: messageBody,
    life: 5000,
  });
};

export const errorNotification = (toast, summary, messageBody) => {
  return toast.current.show({
    severity: 'error',
    summary,
    detail: messageBody,
    life: 5000,
  });
};
