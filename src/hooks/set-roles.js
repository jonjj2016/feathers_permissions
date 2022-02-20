// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const bucket = await context.service.get(context.id)
    const roles = [] 
    bucket.permissions.forEach((item) => {
      if(String(item.userId) === String(context.params.user._id)){
        roles.push(item.role)
      }}
    );
    context.params.user.permissions = roles
    console.log(context.params);
    return context;
  };
};
