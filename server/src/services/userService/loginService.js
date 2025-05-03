const bcrypt = require("bcrypt");
const { User } = require("../../../db/models");
const { generateTokens, saveToken } = require("./tokenService");
const HttpError = require("../../exceptions/HttpError");

const loginService = async (email, password) => {
  const user = await User.findOne({ where: {email } });

  if (!user) {
    throw new HttpError(404, "Пользователя не существует");
  }

  const isPasswordEqual = await bcrypt.compare(password, user.password);

  if (!isPasswordEqual) {
    throw new HttpError(400, "Неверный пароль");
  }

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

module.exports = { loginService };