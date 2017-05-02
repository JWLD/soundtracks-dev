module.exports = {
  path: '/{file*}',
  method: 'GET',
  handler: {
    directory: {
      path: './public'
    }
  }
};
