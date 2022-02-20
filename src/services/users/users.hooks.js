const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const {setField} = require('feathers-authentication-hooks')
const {disallow} = require('feathers-hooks-common')

const restrictToUser = setField({
  from: 'params.user._id',
  as: 'params.query.id'
});

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'),  ],
    update: [ hashPassword('password'),  authenticate('jwt'), restrictToUser ],
    patch: [ hashPassword('password'),  authenticate('jwt'), restrictToUser ],
    remove: [ authenticate('jwt'),restrictToUser ,disallow('external')]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
