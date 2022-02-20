// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const data = {
      role:'owner',
      userId:context.params.user._id,
      createdBy: context.params.user._id,
    } 
    console.log(data);
    context.data.permissions=[
      data
    ]
    return context;
  };
};
