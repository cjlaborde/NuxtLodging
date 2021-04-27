export default (dateStr) => {
    const date = new Date(dateStr)
    // undefined is location it could be 'us-EN'
    // second parameter is date options
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}