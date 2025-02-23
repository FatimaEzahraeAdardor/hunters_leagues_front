const apiUrl = "http://localhost:8080/api";
export const API_ENDPOINT = {
  Auth: {
    Register: `${apiUrl}/auth/register`,
    Login: `${apiUrl}/auth/login`,

  },
  users: `${apiUrl}/users/all`,
  deleteUser: `${apiUrl}/users/delete`,
  updateUser: `${apiUrl}/users/update`,
  competitions: `${apiUrl}/competitions/all`,
  addCompetition: `${apiUrl}/competitions/save`,
  participate: `${apiUrl}/participation/save`,
  species: `${apiUrl}/species/all`,
  allspecies: `${apiUrl}/species`,
  addSpecies: `${apiUrl}/species/save`,
  deleteSpecies: `${apiUrl}/species/delete`,
  updateSpecies: `${apiUrl}/species/update`,

}
  export const LocalStorage ={
    token: "token",
  }
