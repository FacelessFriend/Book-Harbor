const { refreshService} = require("../../services/userService/refreshService");
const cookieConfig = require("../../config/cookieConfig");

const  refresh = async (req,res,next) => {
    try{
        const { refreshToken } = req.cookies;//достаем из куков

        const userData = await refreshService(refreshToken);//дожидаемся когда отработает функция возвращающая данные

        res.cookie("refreshToken", userData.refresh, cookieConfig);

        res.status(200).json(userData);//отправляем на клиент ответ сервера
    }catch(e){
        next(e)//если что отправляем на мидлварку с ошибкой
    }
}

module.exports = {refresh}