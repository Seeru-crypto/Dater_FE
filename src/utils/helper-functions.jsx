export const dateFormatter = (date) => {
  const newDate = date;
  newDate.setHours(date.getHours() + 2);
  const formatDate = newDate.toISOString();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const shortDate = `${year}-${month}-${day}`;
  console.log({ date, formatDate, shortDate });
  return { date: formatDate, shortDate };
};
