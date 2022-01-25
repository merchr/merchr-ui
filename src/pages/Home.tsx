import React, { useContext } from "react";
import "antd/dist/antd.css";

import { Carousel } from "antd";
import "./Home.module.scss";

import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "../util/userContext";

const items = [
    {
        key: "1",
        title: "Tips",
        content: [
            "Press the menu at the top left side to see other app pages.",
            "Press the shopping cart icon to see items added to your order.",
            "Press the avatar icon on the top right to sign in or create an account.",
        ],
    },
];

function Home() {

    const { user } = useContext(UserContext);
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
                                {!user.id && <Link to="/login">
                                    <button className="btn btn-secondary">
                                        Sign in
                                    </button>
                                </Link>
                                }
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
