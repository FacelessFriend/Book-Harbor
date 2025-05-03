const { loginService} = require("../../services/userService/loginService");
const cookieConfig = require("../../config/cookieConfig");

const  login  = async (req,res,next) => {
    try{
        const { email, password } = req.body;//достаем данные с клиента

        const userData = await loginService(email, password);//дожидаемся когда отработает функция возвращающая данные

        res.cookie("refreshToken", userData.refresh, cookieConfig);

        res.status(200).json(userData);//отправляем на клиент ответ сервера
    }catch(e){
        next(e)//если что отправляем на мидлварку с ошибкой
    }
}

module.exports = {login}