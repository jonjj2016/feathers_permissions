// Initializes the `buckets` service on path `/buckets`
const { Buckets } = require('./buckets.class');
const createModel = require('../../models/buckets.model');
const hooks = require('./buckets.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/buckets', new Buckets(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('buckets');

  service.hooks(hooks);
};
