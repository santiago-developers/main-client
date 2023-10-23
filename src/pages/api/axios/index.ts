import Axios from "axios";

const myAxios = Axios.create({
	baseURL: "http://3.34.114.67:11009/",
});

export default myAxios;
