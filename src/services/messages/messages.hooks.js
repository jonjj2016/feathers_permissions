const { authenticate } = require('@feathersjs/authentication').hooks;
const {setField} = require('feathers-authentication-hooks');
const { discard, iff, isProvider } = require('feathers-hooks-common');
const log = require('../../hooks/log');

const restrictToUser = setField({
  from: 'params.user._id',
  as: 'params.query.userId'
});
const setToUser = setField({
  from:'params.user._id',
  as : 'data.userId'
});
const setbucket = setField({
  from:'params.query.bucketid',
  as : 'data.bucket'
});
const restrictExternal=(fields)=>iff(isProvider('external'), discard(...fields));

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create:[setToUser, setbucket, log()],
    update: [restrictToUser],
    patch: [restrictToUser, restrictExternal(['bucket', 'userid'])],
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
