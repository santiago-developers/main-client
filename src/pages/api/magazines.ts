import myAxios from "./axios";

// export const getTodosAPI = () => myAxios.get<TodoType[]>("api/todos");
export const getTodosAPI = () => myAxios.get("api/todos");
