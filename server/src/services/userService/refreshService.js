const { User } = require("../../../db/models");
const {
  validateRefreshToken,
  findToken,
  generateTokens,
  saveToken,
} = require("./tokenService");
const HttpError = require('../../exceptions/HttpError');

const refreshService = async (refresh) => {
  if (!refresh) {
    throw new HttpError(403, "Пользователь не авторизован");
  }

  const isValid = validateRefreshToken(refresh);

  const tokenFromDB = await findToken(refresh);

  if (!isValid || !tokenFromDB) {
    throw new HttpError(403, "Пользователь не авторизован");
  }

  const user = await User.findByPk(tokenFromDB.user_id);

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const tokens = generateTokens(payload);

  await saveToken(payload.id, tokens.refresh);

  return {
    ...tokens,
    user: payload,
  };
};

module.exports = { refreshService };