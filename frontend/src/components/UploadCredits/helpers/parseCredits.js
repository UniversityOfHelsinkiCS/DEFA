const identifiers = [
  {
    regex: /opiskelijanumero/,
    key: 'student_number'
  },
  {
    regex: /kurssi/,
    key: 'course_code'
  },
  {
    regex: /(pvm|päivämäärä)/,
    key: 'date'
  },
  {
    regex: /(laajuus|opintopiste)/,
    key: 'study_credits',
    type: Number
  },
  {
    regex: /arvosana/,
    key: 'grade',
    type: Number
  },
  {
    regex: /kieli/,
    key: 'language'
  },
  {
    regex: /opettaja/,
    key: 'teacher'
  },
  {
    regex: /yliopisto/,
    key: 'university'
  }
]

const identify = (key, identifier) => (
  key.toLowerCase().match(identifier.regex) ? identifier.key : null
)

const identifyKey = key => identifiers.reduce(
  (acc, identifier) => acc || identify(key, identifier),
  null
)

const applyField = (parsed, unparsed, key) => {
  const parsedKey = identifyKey(key)
  if (!parsedKey) { return parsed }
  return {
    ...parsed,
    [parsedKey]: unparsed[key]
  }
}

const parseCredit = credit => {
  const parsed = Object.keys(credit).reduce(
    (acc, key) => applyField(acc, credit, key),
    {}
  )
  if (parsed.study_credits) {
    parsed.study_credits = Number(parsed.study_credits)
  }
  identifiers
    .filter(identifier => identifier.type === Number)
    .forEach(identifier => {
      if (parsed[identifier.key]) {
        parsed[identifier.key] = Number(parsed[identifier.key])
      }
    })
  return parsed
}

const parseCredits = credits => credits
  .map(credit => parseCredit(credit))

export default parseCredits
