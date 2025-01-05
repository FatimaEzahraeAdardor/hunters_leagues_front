const apiUrl = "http://localhost:8080/api";
export const API_ENDPOINT = {
  Auth: {
    Register: `${apiUrl}/auth/register`,
    Login: `${apiUrl}/auth/login`,

  },
  users: `${apiUrl}/users/all`,
  deleteUser: `${apiUrl}/users/delete`,
  updateUser: `${apiUrl}/users/update`,

}
  export const LocalStorage ={
    token: "USER-TOKEN",
  }
