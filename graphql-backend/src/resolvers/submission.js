const { Types } = require('mongoose')
const axios = require('axios')
const { UserModel, SubmissionModel, DEFACourseModel } = require('../models')
const {
  checkLoggedIn,
  checkPrivileged,
  parseKoskiModel,
  parseKoskiName,
  levenshteinMatch
} = require('../utils/helpers')

const submission = async (parent, args, context) => {
  const databaseSubmission = await SubmissionModel.findById(args.id)
  if (!databaseSubmission) return null
  if (context.authorization.id !== String(databaseSubmission.user)) {
    // TODO: make if comparison with object ids instead of strings.
    checkPrivileged(context)
  }
  return databaseSubmission
}

const submissions = async (parent, args, context) => {
  checkPrivileged(context)
  const databaseSubmissions = await SubmissionModel.find({}).populate('user')
  return databaseSubmissions.filter(databaseSubmission => Object.entries(args.user || {}).reduce(
    (acc, [key, value]) => acc && databaseSubmission.user[key].includes(value),
    true
  ))
}

const createSubmission = (parent, args, context) => {
  checkLoggedIn(context)
  return SubmissionModel.create({
    ...args,
    date: Number(new Date()),
    user: Types.ObjectId(context.authorization.id)
  })
}

const deleteSubmission = async (parent, args, context) => {
  checkLoggedIn(context)
  const res = await SubmissionModel.deleteOne({
    _id: Types.ObjectId(args.id),
    user: Types.ObjectId(context.authorization.id)
  })
  if (res.n === 0) return null

  return args.id
}

const approveSubmission = async (parent, args, context) => {
  checkPrivileged(context)
  const databaseSubmission = await SubmissionModel.findByIdAndUpdate(args.submission, {
    approval: args.approval
  })
  if (!databaseSubmission) {
    return null
  }
  databaseSubmission.approval = args.approval
  return databaseSubmission
}

const user = (parent) => UserModel.findById(parent.user)

const koski = async (parent) => {
  try {
    const secret = parent.url.split('/').pop()
    const [response, DEFACourses] = await Promise.all([
      axios.post(
        'https://opintopolku.fi/koski/api/suoritusjako/editor',
        { secret },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ),
      DEFACourseModel.find({})
    ])
    const json = parseKoskiModel(response.data)
    const universities = json.opiskeluoikeudet.reduce(
      (acc, opiskeluoikeus) => acc.concat({
        name: parseKoskiName(opiskeluoikeus.oppilaitos.nimi),
        courses: opiskeluoikeus.opiskeluoikeudet.reduce(
          (acc2, opiskeluoikeus2) => acc2.concat(opiskeluoikeus2.suoritukset
            .filter(suoritus => suoritus.arviointi.reduce(
              (acc3, arviointi) => acc3 || arviointi['hyväksytty'],
              false
            ))
            .map(suoritus => ({
              name: parseKoskiName(suoritus.koulutusmoduuli.nimi),
              credits: suoritus.koulutusmoduuli.laajuus.arvo
            }))
          ),
          []
        )
      }),
      []
    )
    const matches = DEFACourses.map(DEFACourse => universities.reduce(
      (acc, university) => acc.concat(university.courses),
      []
    ).reduce(
      (acc, course) => {
        const distance = levenshteinMatch(course.name, DEFACourse.name)
        console.log(distance, acc.distance)
        if (acc.distance === null) {
          return {
            DEFACourse,
            distance,
            bestMatch: course.name
          }
        }
        if (distance >= acc.distance) return acc
        return {
          DEFACourse,
          distance,
          bestMatch: course.name
        }
      },
      {
        DEFACourse,
        distance: null,
        bestMatch: null
      }
    ))
    return {
      universities,
      matches
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

module.exports = {
  Query: {
    submission,
    submissions
  },
  Mutation: {
    createSubmission,
    approveSubmission,
    deleteSubmission
  },
  Submission: {
    user,
    koski
  }
}
