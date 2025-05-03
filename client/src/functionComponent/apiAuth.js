import $api from "./axiosConfig";

const authReq = async (url = "/refresh") => {
  try {
    const res = await $api.get(url);
    localStorage.setItem("token", res.data.accessToken);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default authReq;
