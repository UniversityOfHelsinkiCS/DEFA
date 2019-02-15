const mongoose = require('mongoose')
const { connect } = require('../../src/mongo/connection')

describe('connect() function', () => {
  afterEach(done => {
    mongoose.connection.close().then(() => done()).catch(done)
  })

  it('resolves.', () => {
    expect(connect()).resolves.toBeInstanceOf(mongoose.Mongoose)
  })

  it('rejects with an Error when password is invalid.', done => {
    const extraOptions = {
      pass: 'wrong'
    }
    connect(extraOptions).then(
      () => done('connect resolved when it should have rejected.')
    ).catch(error => {
      expect(error).toMatchObject({
        name: 'MongoError',
        codeName: 'AuthenticationFailed'
      })
      done()
    })
  })

  it('rejects with an Error when username is invalid.', done => {
    const extraOptions = {
      user: 'wrong'
    }
    connect(extraOptions).then(
      () => done('connect resolved when it should have rejected.')
    ).catch(error => {
      expect(error).toMatchObject({
        name: 'MongoError',
        codeName: 'AuthenticationFailed'
      })
      done()
    })
  })
})
