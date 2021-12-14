module.exports = function (request, response, next) {
  const username = request.session.username;
  if (!username) {
    response.status(401).send("Unauthorized: No session available");
  } else {
    request.username = username;
    next();
  }
};
