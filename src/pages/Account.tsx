import React, { useContext } from "react";
import { UserContext } from "../util/userContext";

function Account() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            <button
                onClick={() => {
                    if (user) {
                        setUser(null);
                    } else {
                        setUser({ id: 1, name: "Jogn" });
                    }
                }}
            >
                {user ? "Logout" : "Login"}
            </button>
        </div>
    );
}

export default Account;
