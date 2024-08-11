import { PropsWithChildren, useContext, useState } from "react";
import { createContext } from "react";

type IUser = { id: number; name: string };

const context = createContext<{ user: IUser }>({
  user: { id: 1, name: "Arshdeep" },
});

export const AuthContext = (props: PropsWithChildren) => {
  const [user] = useState({ id: 1, name: "Arshdeep" });
  return <context.Provider value={{ user }}>{props.children}</context.Provider>;
};

export const useAuth = () => useContext(context);
