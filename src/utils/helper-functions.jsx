export const dateFormatter = (date) => {
    const newDate = date
    newDate.setHours(date.getHours() + 2)
    const formatDate = newDate.toISOString()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    const shortDate = `${year}-${month}-${day}`
    console.log({date, formatDate, shortDate});
    return {date:formatDate, shortDate };
}
