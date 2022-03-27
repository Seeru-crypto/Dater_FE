export const shortDateFormat = (eventDate) => {
  return new Date(eventDate.date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'utc',
    hour12: false,
  });
};

export const shortReminderDateFormat = (eventDate) => {
  if (!eventDate.dateNextReminder) return '-';
  return new Date(eventDate.dateNextReminder).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'utc',
    hour12: false,
  });
};

export const renderBooleanValues = (rowData) => (rowData.reminder ? 'True' : 'false');

export const test = () => true;
