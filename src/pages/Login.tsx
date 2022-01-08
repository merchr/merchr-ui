import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../util/userContext";

function Login() {
    const { user, setUser } = useContext(UserContext);

    if (user) {
        return <Navigate to="/" />;
    }

    const handleSubmit = () => setUser({ id: 1, name: "John" });

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Login</div>
            </div>

            <div className="m-3 row">
                <label className="px-0 py-2" htmlFor="email">
                    Email
                </label>
                <input
                    required
                    type="text"
                    name="email"
                    className="form-control"
                />
            </div>
            <div className="m-3 row">
                <label className="px-0 py-2" htmlFor="password">
                    Password
                </label>
                <input
                    required
                    type="password"
                    name="password"
                    className="form-control"
                />
            </div>

            <div className="row my-4">
                <div className="col mx-auto text-center">
                    <button className="btn btn-secondary" type="submit">
                        Login
                    </button>
                </div>
            </div>
            <div className="row my-4">
                <div className="col mx-auto text-center">
                    Don't have an account yet? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </form>
    );
}

export default Login;
