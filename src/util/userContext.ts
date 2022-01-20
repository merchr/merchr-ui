import React, { createContext } from "react";
import { User } from "./types";

const UserContext = createContext<{
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
    user: {
        cart: [],
    },
    setUser: () => {},
});

export { UserContext };
