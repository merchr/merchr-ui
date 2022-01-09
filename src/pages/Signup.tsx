import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../util/userContext";

function Signup() {
    const { user, setUser } = useContext(UserContext);

    if (user) {
        return <Navigate to="/" />;
    }

    const handleSubmit = () => {};

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Signup</div>
            </div>
            <div className="m-3 row">
                <label className="px-0 py-2" htmlFor="name">
                    Name*
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                />
            </div>
            <div className="m-3 row">
                <label className="px-0 py-2" htmlFor="email">
                    Email*
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
                    Password*
                </label>
                <input
                    required
                    type="text"
                    name="password"
                    className="form-control"
                />
            </div>
            <div className="m-3 row">
                <label className="px-0 py-2" htmlFor="password2">
                    Repeat password*
                </label>
                <input
                    required
                    type="text"
                    name="password2"
                    className="form-control"
                />
            </div>
            <div className="m-3 row">
                <label className="px-0 py-2" htmlFor="address">
                    Address
                </label>
                <input type="text" name="address" className="form-control" />
            </div>
            <div className="m-3 row">
                <label className="px-0 py-2" htmlFor="phone">
                    Phone number
                </label>
                <input type="text" name="phone" className="form-control" />
            </div>

            <div className="row my-4">
                <div className="col mx-auto text-center">
                    <button className="btn btn-secondary" type="submit">
                        Sign up
                    </button>
                </div>
            </div>
            <div className="row my-4">
                <div className="col mx-auto text-center">
                    Already have an account? <Link to="/signup">Log in</Link>
                </div>
            </div>
        </form>
    );
}

export default Signup;
