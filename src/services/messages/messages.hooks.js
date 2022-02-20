const { authenticate } = require('@feathersjs/authentication').hooks;
const {setField} = require('feathers-authentication-hooks')

const restrictToUser = setField({
  from: 'params.user._id',
  as: 'params.query.userId'
});
const setToUser = setField({
  from:'params.user.id',
  as : 'params.data.userId'
});
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create:[setToUser],
    update: [restrictToUser],
    patch: [restrictToUser],
    remove: [restrictToUser]
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
