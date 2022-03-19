export const shortDateFormat = (eventDate) => {
  const result = new Date(eventDate).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'utc',
    hour12: false,
  });

  console.log(result);
  return result;
};

export const test = () => true;
