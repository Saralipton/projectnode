const success = (res, status) => (entity) => {
  if (entity) {
    console.log(entity);
    res.status(status || 200).json(entity);
  }
  return null;
};

const notFound = (res) => (entity) => {
  if (entity) {
    return entity;
  }
  res.status(404).end();
  return null;
};

module.exports = {
  notFound,
  success,
};
//currying is when a function doesn't take all of its arguments upfront

//the purpose of that is your function can pass through the application and gradually recieve its
//arguments not all at once
