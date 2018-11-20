import { Types } from 'mongoose'
import { IUser, IvalidatorFunction } from '../types/interface'
import userAccess from './userAccess'
import { IEditCredit } from '../types/Credit'
import { CreditModel } from '../models'
import { ICreditModel } from '../models/Credit'
import InvalidInputError from '../../utils/errors/InvalidInputError'

const checkCredits = async (credits: IEditCredit[], user: IUser): Promise<void> => {
  if (!Array.isArray(credits)) {
    throw new InvalidInputError('Invalid input.')
  }
  if (credits.length === 0) {
    throw new InvalidInputError('No credits were tagged for removal.')
  }
  const ids: Types.ObjectId[] = credits.map(credit => Types.ObjectId(credit.id))
  const dbCredits: ICreditModel[] = (await CreditModel.find({
    _id: {
      $in: ids
    }
  })) as ICreditModel[]
  dbCredits.forEach((dbCredit: ICreditModel) => {
    if (String(dbCredit.teacher) !== user.id) {
      throw new InvalidInputError('Credit uploader did not match user.')
    }
  })
}

const checkCreditOwnership: IvalidatorFunction = async (...inputs) => {
  userAccess(...inputs)
  await checkCredits(inputs[1].credits, inputs[2].user)
}

export default checkCreditOwnership
