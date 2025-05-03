const bcrypt = require("bcrypt");
const { User } = require("../../../db/models");
const { generateTokens, saveToken } = require("./tokenService");
const HttpError = require('../../exceptions/HttpError');

const registrationService = async (name, email, password) => {
  const userByLogin = await User.findOne({ where: { email } });

  if (userByLogin) {
    throw new HttpError(400, "Пользователь с такой почтой уже существует");
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ name, email, password: hashPassword });
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

module.exports = { registrationService };