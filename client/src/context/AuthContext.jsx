import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user: {
  //   coverPicture: "",
  //   createdAt: "2024-02-01T10:55:11.788Z",
  //   email: "kamil@gmail.com",
  //   followers: ["65bb79350d77fd185561bff5"],
  //   followings: ["65bb79350d77fd185561bff5"],
  //   isAdmin: false,
  //   password: "$2b$10$0RkBEK30L1nCgVEk9T4jS.Dwx4BaAUNiyRn59A1CeSHHzuvctcB4K",
  //   profilePicture: "",
  //   updatedAt: "2024-04-02T22:32:28.730Z",
  //   username: "kamil",
  //   __v: 0,
  //   _id: "65bb788f0d77fd185561bfe5",
  // } ,
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
