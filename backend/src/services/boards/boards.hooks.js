const { setField } = require('feathers-authentication-hooks');

module.exports = {

  before: {
    all: [],
    find: [
      setField({
        from: 'params.user._id',
        as: 'params.query.ownerId'
      })
    ],
    get: [
      setField({
        from: 'params.user._id',
        as: 'params.query.userId'
      })
    ],
    create: [
      setField({
        from: 'params.user._id',
        as: 'data.ownerId'
      })
    ],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }

};