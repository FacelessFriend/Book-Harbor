const { registrationService } = require("../../services/userService/registrationService");
const cookieConfig = require("../../config/cookieConfig");

const registration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body; //достаем данные с клиента

    const userData = await registrationService(name, email, password); //дожидаемся когда отработает функция возвращающая данные

    res.cookie("refreshToken", userData.refresh, cookieConfig);

    res.status(201).json(userData); //отправляем на клиент ответ сервера
  } catch (e) {
    next(e); //если что отправляем на мидлварку с ошибкой
  }
};

module.exports = {registration}