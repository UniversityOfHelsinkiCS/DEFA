const { Types } = require('mongoose')
const axios = require('axios')
const { UserModel, SubmissionModel } = require('../models')
const { checkLoggedIn, checkPrivileged, parseKoskiModel } = require('../utils/helpers')

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
  let json
  try {
    const secret = parent.url.split('/').pop()
    const response = await axios.post(
      'https://opintopolku.fi/koski/api/suoritusjako/editor',
      { secret },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    json = parseKoskiModel(response.data)
  } catch (e) {
    return null
  }
  const courses = json.opiskeluoikeudet.reduce(
    (acc, opiskeluoikeus) => acc.concat({
      name: opiskeluoikeus.oppilaitos.nimi.en,
      courses: opiskeluoikeus.opiskeluoikeudet.reduce(
        (acc2, opiskeluoikeus2) => acc2.concat(opiskeluoikeus2.suoritukset
          .filter(suoritus => suoritus.arviointi.reduce(
            (acc3, arviointi) => acc3 || arviointi['hyväksytty'],
            false
          ))
          .map(suoritus => ({
            name: suoritus.koulutusmoduuli.nimi.en,
            credits: suoritus.koulutusmoduuli.laajuus.arvo
          }))
        ),
        []
      )
    }),
    []
  )
  return courses
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
