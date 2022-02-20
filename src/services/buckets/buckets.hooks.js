const { authenticate } = require('@feathersjs/authentication').hooks;
const {setField} = require('feathers-authentication-hooks')
const {discard} = require('feathers-hooks-common');
const setParams =  require('../../hooks/noooo')
const checkPermissions = require('feathers-permissions');
const setRoles = require('../../hooks/set-roles');

const restrictToUser = setField({
  from: 'params.user._id',
  as: 'params.query.adminId'
});
const setToUser = setField({
  from:'params.user._id',
  as : 'params.data.adminId'
});

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [setRoles()],
    get: [],
    create:[setToUser, discard('permissions'),setParams()],
    update: [restrictToUser],
    patch: [setRoles(), checkPermissions({
      roles:['owner']
    }), ],
    remove: [restrictToUser, setRoles()]
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
