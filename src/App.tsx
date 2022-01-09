import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Navbar from "./ui/Navbar";
import { User } from "./util/types";
import { UserContext } from "./util/userContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Categories from "./pages/Categories";
import Product from "./pages/Product";
import { USER_EMAIL, USER_PASSWORD } from "./util/constants";

function App() {
    const [user, setUser] = useState<User | null>(null);

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    useEffect(() => {
        if (!user) {
            const email = localStorage.getItem(USER_EMAIL);
            const password = localStorage.getItem(USER_PASSWORD);

            if (email && password) {
                fetch("http://localhost:1337/api/auth/local", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        identifier: email,
                        password: btoa(password),
                    }),
                })
                    .then((response) =>
                        response.json().then((response) => {
                            if (response.error) {
                                return;
                            }

                            const { id, username, email, address, phone } =
                                response.user;

                            setUser({
                                id,
                                username,
                                email,
                                address,
                                phone,
                            });
                        })
                    )
                    .catch((error) => {
                        console.log("An error occurred:", error.response);
                    });
            }
        }
    }, []);

    return (
        <UserContext.Provider value={value}>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/product/" element={<Product />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
