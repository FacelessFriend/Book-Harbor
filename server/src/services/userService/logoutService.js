const { removeToken } = require("./tokenService");

const logoutService = async (refresh) => {
  const countToken = await removeToken(refresh);
  return countToken;
};

module.exports = { logoutService };