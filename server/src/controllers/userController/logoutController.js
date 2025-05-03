const { logoutService} = require("../../services/userService/logoutService");
const cookieConfig = require("../../config/cookieConfig");

const  logout  = async (req,res,next) => {
    try{
        const { refreshToken } = req.cookies;//достаем из куков

        await logoutService(refreshToken);//дожидаемся когда отработает функция возвращающая данные

        res.clearCookie("refreshToken");
        
        res.status(200).json({ message: "Вы разлогинились" });//отправляем на клиент ответ сервера
    }catch(e){
        next(e)//если что отправляем на мидлварку с ошибкой
    }
}

module.exports = {logout}