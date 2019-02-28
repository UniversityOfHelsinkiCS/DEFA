const parseDate = date => {
  const toParse = date instanceof Date ? date : new Date(date)
  const year = String(toParse.getFullYear())
  const month = String(toParse.getMonth() + 1).padStart(2, '0')
  const day = String(toParse.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default parseDate
