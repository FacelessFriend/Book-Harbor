import $api from "./axiosConfig";

const logoutReq = async () => {
    try {
      await $api.post("/logout");
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  export default logoutReq;