import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Navbar from "./ui/Navbar";
import { User } from "./util/types";
import { UserContext } from "./util/userContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { USER_EMAIL, USER_PASSWORD } from "./util/constants";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Footer from "./footer";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import Cart from "./components/Cart";

function App() {
    const [user, setUser] = useState<User>({ cart: [] });

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    const handleAddToCart = (clickedItemId: number) => {
        setUser({ ...user, cart: [...user.cart, clickedItemId] });
    };

    const handleRemoveFromCart = (id: number) => {
        const handleRemoveFromCart = (id: number) => {
            user.cart.find(
                (item) =>
                    item === id && delete user.cart[user.cart.indexOf(item)]
            );
            setUser({ ...user, cart: user.cart });
            console.log("usercart", user.cart);
        };
    };

    useEffect(() => {
        if (!user.id) {
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

                            const {
                                id,
                                username,
                                email,
                                name,
                                address,
                                phone,
                            } = response.user;

                            setUser({
                                ...user,
                                id,
                                username,
                                name,
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
                        <Route path="/products" element={<Products />} />
                        <Route path="/product/" element={<Product />} />
                        <Route
                            path="/cart"
                            element={
                                <Cart
                                    addToCart={handleAddToCart}
                                    removeFromCart={handleRemoveFromCart}
                                />
                            }
                        />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route
                            path="/confirmation"
                            element={<Confirmation />}
                        />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/orders/:id" element={<Order />} />

                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>

            <Footer />
        </UserContext.Provider>
    );
}

export default App;
