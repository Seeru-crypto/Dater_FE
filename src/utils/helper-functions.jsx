export const shortDateFormat = (eventDate) => {
  return new Date(eventDate).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'utc',
    hour12: false,
  });
};

export const test = () => true;
