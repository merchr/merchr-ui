import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../util/userContext";

function Account() {
    const { user } = useContext(UserContext);

    if (!user.id) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Account</div>
            </div>
            <div className="mx-3" style={{ width: "250px" }}>
                <h4 className="mb-4" style={{ fontWeight: "normal" }}>
                    User details
                </h4>
                <dl
                    style={{
                        display: "flex",
                        gap: "14px",
                        flexWrap: "wrap",
                        flexDirection: "column",
                    }}
                >
                    <div className="def">
                        <dt>Username:</dt>
                        <dd>{user.username}</dd>
                    </div>
                    <div className="def">
                        <dt>Name:</dt>
                        <dd>{user.name}</dd>
                    </div>
                    <div className="def">
                        <dt>Email:</dt>
                        <dd>{user.email}</dd>
                    </div>
                    <div className="def">
                        <dt>Address:</dt>
                        <dd>{user.address}</dd>
                    </div>
                    <div className="def">
                        <dt>Phone:</dt>
                        <dd>{user.phone}</dd>
                    </div>
                </dl>

                {/* {user.id && (
                    <button
                        
                        onClick={() => {
                            localStorage.removeItem(USER_EMAIL);
                            localStorage.removeItem(USER_PASSWORD);
                            setUser({ cart: [] });
                        }}
                    >
                        <LogoutOutlinedIcon className="mx-2" />
                        <ListItemText primary={"Log out"} />
                    </button>
                )} */}
            </div>
        </div>
    );
}

export default Account;
