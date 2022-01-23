import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";

import { Carousel, Button } from "antd";
import "./Home.module.scss";

import "../App.css";
import { Link } from "react-router-dom";

const items = [
    {
        key: "1",
        title: "Tips",
        content: [
            "Press the menu at the top left side to see the products.",
            "Press the avatar icon on the top right to sign in or create an account.",
        ],
    },
];

function Home() {
    const [data, setData] = useState();

    useEffect(() => {
        fetch("http://localhost:1337/api/products")
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    return (
        <div className="heroBlock">
            <div id="hero" className="heroBlock">
                <Carousel>
                    <div className="container-fluid">
                        <div className="content">
                            <h3 className="content">
                                Welcome to our merch store
                            </h3>
                            <div className="btnHolder">
                                <Link to="/login">
                                    <button className="btn btn-secondary">
                                        Sign in
                                    </button>
                                </Link>
                                <Link to="/products">
                                    <button className="btn btn-primary">
                                        Shop now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {items.map((item) => {
                        return (
                            <div key={item.key} className="container-fluid">
                                <div className="content">
                                    <h3>{item.title}</h3>
                                    {item.content.map((sentence) => (
                                        <p>{sentence}</p>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </div>
    );
}

export default Home;
