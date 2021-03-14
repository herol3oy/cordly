import { createContext } from "react";

const userData = {
  user: {
    uid: "",
    photoURL: "",
    displayName: "",
  },
  username: "",
};

export const UserContext = createContext(userData);
