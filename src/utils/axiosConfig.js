// const token = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user")).token
//   : null;

// export const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     Accept: "application/json",
//   },
// };

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
