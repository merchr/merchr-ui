import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Navbar from "./ui/Navbar";
import { User } from "./util/types";
import { UserContext } from "./util/userContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    const [user, setUser] = useState<User | null>(null);

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

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
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
