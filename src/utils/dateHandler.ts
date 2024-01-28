const fullMonthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const shortMonthsList = fullMonthsList.map(month => month.slice(0, 3))

export const getStructuredDate = (date: string) => {
    const [year, month, day] = date.split('-')
    const monthName = shortMonthsList[Number(month) - 1]
    return `${monthName} ${day}, ${year}`
}

export const getStructuredMonth = (date: string) => {
    const [year, month] = date.split('-')
    const monthName = fullMonthsList[Number(month) - 1]
    return `${monthName} ${year}`
}