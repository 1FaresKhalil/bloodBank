import { createContext, useReducer } from "react";

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(AuthReducer, "");
  return (
    <AuthContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
function AuthReducer(user, action) {
  switch (action.type) {
    case "login": {
      return action.user;
    }
    case "logout": {
      return "";
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
